require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')

module.exports = function (pathname) {

    String.validate.notVoid(pathname)
    
    const [first ,match, third] = pathname.split('/')
    console.log(match)
    return match === 'establishment'
}.bind(context)