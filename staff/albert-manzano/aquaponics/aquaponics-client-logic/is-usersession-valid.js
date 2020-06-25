/**
 * checks if tokens user still valid
 *@param {context} token through context
 */

require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/function')
const { utils: { call } } = require('aquaponics-commons')
const __context__ = require('./context')

module.exports = async function () {
    const  token  = await this.storage.getItem("token")

    const {status} = await call('GET', `${this.API_URL}/users`, undefined, { 'Authorization': `Bearer ${token}` })
    
    if (status) return status === 200

}.bind(__context__)