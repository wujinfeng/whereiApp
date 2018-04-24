// pages/map/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 0,
    longitude: 0,
    markers: [],
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
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.myLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
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
      path: '/pages/map/index?share=2&fromName=' + that.data.userInfo.nickName,
      imageUrl:'/static/image/share.png',
      success: function (res) {
        // 转发成功
        console.log('转发成功')
        console.log(res)
        // 记录openId
        let openId = app.globalData.loginInfo.openId
        console.log(openId)
        if(!openId){
          return console.log('openId not found')
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
        console.log(res)
      }
    }

  }
})