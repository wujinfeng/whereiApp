/** 
 * 用户接口 
 */
let config = require('../config');
class User {
  /** 
   * 登陆 
   * @return {Promise}  
   */
  static login() {
    return new Promise((resolve, reject) => wx.login({
      success: res => {
        let that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login res.code:', res.code)
        wx.request({
          url: config.LOGIN_URL,
          method: 'POST',
          dataType: 'json',
          data: { code: res.code },
          success: function (res) {          
            if (res.statusCode === 200 && res.data.code === 200) {
              resolve(res.data.data)
            } else {
              reject(res.data.msg)
            }
          },
          fail: function () {
            reject('请求失败，请重试')
          },
        })
      },
      fail: res=>{
        reject(res)
      }
    }));
  }

  /** 
   * 获取用户信息 
   * @return {Promise}  
   */
  static getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                resolve(res.userInfo)
              },
              fail: ()=> {
                reject('请求失败，请重试')
              },
            })
          }else{
            reject('你未授权，不能获取头像昵称')
          }
        },
        fail: () => {
          reject('请求失败，请重试!')
        },
      })
    });
  }

  static addUser(openId, nickName) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.ADD_URL,
        method: 'POST',
        dataType: 'json',
        data: { openId: openId, nickName: nickName },
        success: function (res) {
          if (res.statusCode === 200 && res.data.code === 200) {
            resolve('ok')           
          } else {
            reject(res.data.msg)
          }
        },
        fail: function () {
          reject('请求失败')
        },
      })
    })
  }

};

module.exports = User;  