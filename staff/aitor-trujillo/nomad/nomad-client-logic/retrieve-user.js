require('nomad-commons/polyfills/string')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function () {
    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
            const result = await call(
                'GET',
                `${this.API_URL}/users/`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 200) return JSON.parse(body)
            else throw new Error('could not retrieve user')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)