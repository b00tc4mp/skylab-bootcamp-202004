require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)



    return (async () => {

        const result = await call(
            'GET',
            `${this.API_URL}/users`,
            undefined,
            { 'Authorization': `Bearer ${token}` }
        )

        const { status } = result
        return status === 200

    })()
}.bind(context)