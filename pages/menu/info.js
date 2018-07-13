// pages/menu/info.js
let Menu = require('../../utils/menu.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menuInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let id = options.id;
        console.log(id)
        let params = {id: id};
        Menu.getMenuInfo(params)
            .then((d) => {
                console.log(d)
                that.setData({
                    menuInfo: d
                })
            }).catch(e => {
            console.error(e)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
    onShareAppMessage: function () {

    }
})