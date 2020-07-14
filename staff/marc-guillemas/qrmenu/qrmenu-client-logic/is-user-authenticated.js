require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')
/**
 * @param {string} token of the current worker
 */
module.exports = function (token) {

    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/worker`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}.bind(context)