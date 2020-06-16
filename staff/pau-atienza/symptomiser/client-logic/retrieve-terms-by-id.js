require('commons/polyfills/string')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = function (HPO_id) {
    String.validate.notVoid(HPO_id)

    return (async ()=>{
        const {status, body} = await call('GET', `${this.API_URL}/terms/${HPO_id}`, undefined, undefined)
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()
}.bind(context)