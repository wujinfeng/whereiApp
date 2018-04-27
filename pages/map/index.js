// pages/map/index.js
let config = require('../../config');
let user = require('../../utils/user.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    loginInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 0,
    longitude: 0,
    fromOpenId: '',
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({ fromOpenId: '' })
    let share = options.share
    console.log('share:', share)
    if(share){
      that.setData({ fromOpenId: options.fromOpenId })
      wx.showToast({
        title: '分享来自:' + options.fromName,
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
    this.myLocation()    
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
        user.login()
          .then(r => {
            console.log('login:', r)
            app.globalData.loginInfo = r;
            return user.getUserInfo()
          })
          .then(r => {
            console.log('userinfo:', r)
            app.globalData.userInfo = r;
            let nickName = app.globalData.userInfo.nickName;
            let openId = app.globalData.loginInfo.openid;
            return user.addUser(openId, nickName)
          }).then((d) => {
             console.log('addUser:', d)
            let params = {
              fromOpenId : that.data.fromOpenId,
              openId: app.globalData.loginInfo.openid,
              nickName: app.globalData.userInfo.nickName,
              coordinate: latitude + ',' + longitude
            }
            if(!params.fromOpenId){
              return;
            }
            return user.location(params)
          }).then((d)=>{
             console.log('addUserLocation:', d)
          })
          .catch(e => {
            console.log(e);
          })
      }
    })
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
      path: '/pages/map/index?share=2&fromName=' + app.globalData.userInfo.nickName + '&fromOpenId=' + app.globalData.loginInfo.openid,
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