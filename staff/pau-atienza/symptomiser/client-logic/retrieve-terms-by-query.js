/**
 * Calls the the API to receive predictions and provides it with the query introduced by the user.
 * 
 * @param {string} query the query submitted by the user
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

require('commons/polyfills/string')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = function (query) {
    String.validate.notVoid(query) 
    
    return (async function(url){
        const {status, body} = await call('GET', `${url}/terms/query/${query}`, undefined, undefined)
    
        if (status !== 200) {
            const {error} = JSON.parse(body)
    
            throw new Error(error)
        }
    
        return JSON.parse(body)
    })(this.API_URL)
}.bind(context)