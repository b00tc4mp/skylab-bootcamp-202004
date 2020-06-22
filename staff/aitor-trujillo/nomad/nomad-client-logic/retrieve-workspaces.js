require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function ({ latitude, longitude }, filter) {
    Number.validate(latitude)
    Number.validate(longitude)

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }

            const result = await call(
                'GET',
                filter ? `${this.API_URL}/workspaces/location/${latitude}/${longitude}/${filter}` : `${this.API_URL}/workspaces/location/${latitude}/${longitude}/`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 200) return JSON.parse(body)
            else throw new Error('could not retrieve workspaces')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)