require('commons/polyfills/string')
const { errors: { UnexistenceError }, utils: { call } } = require('commons')
const context = require('./context')

module.exports = function (query) {
    String.validate.notVoid(query)

    return (async ()=>{
        const {status, body} = await call('GET', `${this.API_URL}/terms/query/${query}`, undefined, undefined)
        if (status !== 200) {
            const {error} = JSON.stringify(body)

            return {error}
        }
        return JSON.stringify(body)
    })()
}.bind(context)