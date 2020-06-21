require('commons/polyfills/string')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = async function (query) {
    String.validate.notVoid(query)
    
    const {status, body} = await call('GET', `${this.API_URL}/terms/query/${query}`, undefined, undefined)

    if (status !== 200) {
        const {error} = JSON.parse(body)

        throw new Error(error)
    }

    return JSON.parse(body)
}.bind(context)