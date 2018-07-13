const debug = true;
const HOST = debug ? 'http://192.168.50.18:3001' : 'https://chi.xiaomaiw.top';
let config = {
    LOGIN_URL: HOST + '/admin/user/login',
    SHARE_URL: HOST + '/admin/user/share',
    LOCATION_URL: HOST + '/admin/user/location',
    ADD_URL: HOST + '/admin/user/add',
    GETSHARE_URL: HOST + '/admin/user/getShare',
    GET_ALLMENU_URL: HOST + '/admin/menu/all',
    GET_MENUINFO_URL: HOST + '/admin/menu/info',
};

module.exports = config;