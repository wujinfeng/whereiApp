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
            reject('登录请求失败，请重试')
          },
        })
      },
      fail: res=>{
        reject(res)
      }
    }));
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
            resolve()
            console.log(res.data.msg)
          }
        },
        fail: function () {
          console.log('添加use请求失败')
        },
      })
    })
  }

  static location(params) {
    return new Promise((resolve, reject) => {      
      wx.request({
        url: config.LOCATION_URL,
        method: 'POST',
        dataType: 'json',
        data: params,
        success: function (res) {
          if (res.statusCode === 200 && res.data.code === 200) {
            resolve('ok')
          } else {
            reject(res.data.msg)
          }
        },
        fail: function () {
          reject('location请求失败')
        },
      })
    })
  }

};

module.exports = User;  