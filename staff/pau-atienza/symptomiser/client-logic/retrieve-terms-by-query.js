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