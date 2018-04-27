const HOST = 'http://192.168.50.145:3001'
let config={
    LOGIN_URL: HOST + '/admin/user/login',
    SHARE_URL: HOST + '/admin/user/share',
    LOCATION_URL: HOST + '/admin/user/location',
    ADD_URL: HOST + '/admin/user/add'
}

module.exports = config
