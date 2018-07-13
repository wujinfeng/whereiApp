/**
 * 用户接口
 */
let config = require('../config');

class Menu {
    /**
     * 获取所有菜单
     * @return {Promise}
     */
    static getAllMenu(params) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: config.GET_ALLMENU_URL,
                method: 'GET',
                dataType: 'json',
                data: params || {},
                success: function (res) {
                    if (res.statusCode === 200 && res.data.code === 200) {
                        resolve(res.data.data)
                    } else {
                        reject(res)
                    }
                },
                fail: function (res) {
                    reject(res)
                },
            })
        })
    }

    static getMenuInfo(params) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: config.GET_MENUINFO_URL,
                method: 'GET',
                dataType: 'json',
                data: params || {},
                success: function (res) {
                    if (res.statusCode === 200 && res.data.code === 200) {
                        resolve(res.data.data)
                    } else {
                        reject(res)
                    }
                },
                fail: function (res) {
                    reject(res)
                },
            })
        })
    }

};

module.exports = Menu;