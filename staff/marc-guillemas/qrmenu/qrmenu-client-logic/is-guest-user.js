require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')
/**
 * @param {string} pathname url recived with the qr code
 */
module.exports = function (pathname) {

    String.validate.notVoid(pathname)
    
    const [first ,match, third] = pathname.split('/')
    return match === 'establishment'
}.bind(context)