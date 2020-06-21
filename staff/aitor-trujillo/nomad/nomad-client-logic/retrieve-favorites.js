require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    const headers = { Authorization: `Bearer ${token}` }

    return (async () => {
        try {
            const result = await call(
                'GET',
                `${this.API_URL}/favorites`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 200) return JSON.parse(body)

            else throw new Error('could not retrieve favorites')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)