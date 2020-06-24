/**
 * Checks if user has access with valid token.
 * 
 * @returns {Promise<String>} true if it resolves, false if it rejects.
 * 
 * @throws {Error} If something went wrong calling the api.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function () {

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const result = await call(
                'GET',
                `${this.API_URL}/users/`,
                undefined,
                { Authorization: `Bearer ${token}` }
            )

            const { status } = result
            return status === 200
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)