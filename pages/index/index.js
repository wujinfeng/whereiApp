//index.js
//获取应用实例
let config = require('../../config');
let user = require('../../utils/user.js')
let Menu = require('../../utils/menu.js')
let util = require('../../utils/util.js')
const app = getApp()
let currentMenu = null; // 当前抽取的菜单对象
Page({
    data: {
        friendName: '',
        userInfo: {},
        loginInfo: {},
        fromOpenId: '',
        menu: [],
        myMenu: '',
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    clickWhatBtn: function () {
        let that = this;
        that.setData({myMenu: '...'})
        wx.showLoading({title: '加载中',})
        let random = Math.floor(Math.random() * that.data.menu.length)
        setTimeout(function () {
            wx.hideLoading()
            currentMenu = that.data.menu[random]
            that.setData({
                myMenu: currentMenu.name
            })
        }, 500)
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
        this.getAllMenu()
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

    getAllMenu: function () {
        let that = this;
        Menu.getAllMenu()
            .then((d) => {
                console.log('getAllMenu',d);
                that.setData({menu: d})
            }).catch(e => {
            console.log(e)
        })
    },

    getMenuInfo: function () {
        wx.navigateTo({
            url: '/pages/menu/info?id='+currentMenu.id
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
