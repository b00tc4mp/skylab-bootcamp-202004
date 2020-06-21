require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, query) {

    String.validate.notVoid(token)
    String.validate.notVoid(query)

    const headers = { Authorization: `Bearer ${token}` }
    return (async () => {
        try {
            const result = await call(
                'GET',
                `${this.API_URL}/workspaces/search/${query}/`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 200) return JSON.parse(body)
            else throw new Error('could not search workspaces')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)