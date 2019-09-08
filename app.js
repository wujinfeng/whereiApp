//app.js
let config = require('./config');
let user = require('./utils/user.js')

App({
    onLaunch: function () {
        let that = this;
        user.login().then(r => {
            console.log('app login:', r)
            that.globalData.loginInfo = r;
        })
    },
    globalData: {
        userInfo: {},
        loginInfo: {}
    }
})