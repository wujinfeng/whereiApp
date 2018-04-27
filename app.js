//app.js
let config = require('./config');
let user = require('./utils/user.js')
App({
  onLaunch: function () {
    let that = this;
    user.login()
      .then(r => {
        console.log('login:', r)
        that.globalData.loginInfo = r;
        return user.getUserInfo()
      })
      .then(r => {
        console.log('userinfo:', r)
        that.globalData.userInfo = r;
        let nickName = that.globalData.userInfo.nickName;
        let openId = that.globalData.loginInfo.openid;
        return user.addUser(openId, nickName)
      }).then((d)=>{
        console.log('addUser:', d)
      })
      .catch(e => {
        console.log(e);
      })  
  },
  globalData: {
    userInfo: null,
    loginInfo: null
  }
})