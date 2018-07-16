// pages/user/index.js
let config = require('../../config');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friendName: '',
        shareData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 点击我的位置，跳转
    clickMyLocaBtn: function (e) {
        let coordinate = e.currentTarget.dataset.coordinate;
        let arr = coordinate.split(',')
        if (arr.length === 2) {
            wx.openLocation({
                latitude: Number(arr[0]),
                longitude: Number(arr[1]),
                scale: 17
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    bindKeyInput: function (e) {
        console.log(e.detail.value)
        this.setData({
            friendName: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //获取分享信息
        let openId = app.globalData.loginInfo.openid;
        let that = this;
        wx.showLoading({title: '加载中',})
        wx.request({
            url: config.GETSHARE_URL,
            method: 'POST',
            dataType: 'json',
            data: {openId: openId},
            success: function (res) {
                console.log('结果', res);
                wx.hideLoading();
                if (res.statusCode === 200 && res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({shareData: res.data.data})
                } else {
                    console.error(res)
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络繁忙，请稍后重试！',
                        icon: 'none',
                        duration: 2500
                    })
                }
            },
            fail: function (res) {
                console.error(res)
                wx.hideLoading();
                wx.showToast({
                    title: '网络繁忙，请稍后重试！',
                    icon: 'none',
                    duration: 2500
                })
            },
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this
        // if (!that.friendName){
        //   wx.showModal({ title: '分享失败', content: '请随便给好友写个名称,就可以查看到好友是否打开' })
        // }
        return {
            title: ' ',
            path: '/pages/index/index?share=2&fromOpenId=' + app.globalData.loginInfo.openid + '&friendName=' + that.data.friendName,
            imageUrl: '/static/image/share.png',
            success: function (res) {
                // 转发成功
                console.log('转发成功')
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
                            wx.showToast({
                                title: '分享成功',
                                icon: 'success',
                                duration: 2000
                            })
                        } else {
                            // wx.showModal({title: '分享失败', content: res.data.msg})
                        }
                    },
                    fail: function () {
                        //wx.showModal({title: '提示', content: '请求失败，请重试！'})
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