const debug = false;
const HOST = debug ? 'http://192.168.50.18:3001' : 'https://pt.xiaomaiw.top/';
let config = {
    LOGIN_URL: HOST + '/admin/user/login',
    SHARE_URL: HOST + '/admin/user/share',
    LOCATION_URL: HOST + '/admin/user/location',
    ADD_URL: HOST + '/admin/user/add',
    GETSHARE_URL: HOST + '/admin/user/getShare',
};

module.exports = config;