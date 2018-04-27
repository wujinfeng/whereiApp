// pages/map/index.js
let config = require('../../config');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasAppGlobalData: false,
    userInfo: {},
    loginInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 0,
    longitude: 0,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let share = options.share
    let fromName = options.fromName
    console.log('share:', share)
    if(share){
      wx.showToast({
        title: '分享来自:' + fromName,
        icon: 'none',
        duration: 4000
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')

    console.log('globalData.userInfo:', app.globalData.userInfo)
    console.log('globalData.loginInfo:', app.globalData.loginInfo)
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }

    if (app.globalData.loginInfo) {
      this.setData({
        loginInfo: app.globalData.loginInfo
      })
    }

    this.myLocation()
    this.getAppGlobalData()
  },
  
  // 将地图中心移动到当前定位点，需要配合map组件的show-location使用
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
    this.myLocation()
  },
 
  myLocation: function(){
    let that = this
    wx.getLocation({
      type: 'gcj02',      
      success: function (res) {
        console.log('我的位置：', res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let markers = [{
          id: 1,
          latitude: latitude,
          longitude: longitude,
          name: '我的位置'
        }]
        that.setData({ latitude: latitude, longitude: longitude, markers: markers })
      }
    })
  },

  getAppGlobalData: function(){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log('button')
    }
    return {
      title: '我在哪',
      path: '/pages/map/index?share=2&fromName=' + app.globalData.userInfo.nickName,
      imageUrl:'/static/image/share.png',
      success: function (res) {
        // 转发成功
        console.log('转发成功')
        console.log(res)
        // 记录openId
        let openId = app.globalData.loginInfo.openid
        console.log(openId)
        if(!openId){
          return console.log('openId not found')
        }
        wx.request({
          url: config.SHARE_URL,
          method: 'POST',
          dataType: 'json',
          data: { openId: openId },
          success: function (res) {
            console.log('结果', res);
            if (res.statusCode === 200 && res.data.code === 200) {
              wx.showModal({ title: '分享成功', content: res.data.msg })
            } else {
              wx.showModal({ title: '分享失败', content: res.data.msg })
            }
          },
          fail: function () {
            wx.showModal({ title: '提示', content: '请求失败，请重试！' })
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