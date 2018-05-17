// pages/map/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // latitude: 0,
    // longitude: 0,
    // markers: [{
    //   iconPath: "/static/image/location.png",
    //   id: 0,
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 50,
    //   height: 50
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var coordinate = options.coordinate;
    // console.log(coordinate)
    // var arr = coordinate.split(',');
    // if (arr.length !== 2) {
    //   return wx.showModal({ title: '错误提示', content: '该用户没有分享位置' })
    // }
    //this.setData({ latitude: Number(arr[0]), longitude: Number(arr[1]) });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
   // this.mapCtx = wx.createMapContext('myMap')
  },

  // 将地图中心移动到当前定位点，需要配合map组件的show-location使用
  moveToLocation: function () {
    //this.mapCtx.moveToLocation()
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

  

})