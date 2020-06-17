require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, { latitude, longitude }) {

    String.validate.notVoid(token)
    Number.validate(latitude)
    Number.validate(longitude)

    const headers = { Authorization: `Bearer ${token}` }

    return (async () => {
        try {
            const result = await call(
                'GET',
                `${this.API_URL}/workspaces/location/${latitude}/${longitude}`,
                undefined,
                headers
            )
            const { status, body } = result

            console.log(body)

            if (status === 200) return JSON.parse(body)
            else throw new Error('could not retrieve workspaces')
        } catch (error) {
            console.log(error) // TODO
        }

    })()
}.bind(context)