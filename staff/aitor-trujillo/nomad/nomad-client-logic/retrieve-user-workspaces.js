/**
 * Retrieves user created workspaces.
 * 
 * @returns {Promise<String>} The workspaces array if it resolves, an error if it rejects.
 * 
 * @throws {Error} If something went unexpected, or is there is no workspaces created to retrieve.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function () {

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
            const result = await call(
                'GET',
                `${this.API_URL}/workspaces/user/get/`,
                undefined,
                headers
            )
            const { status, body } = result

            if (status === 200) return JSON.parse(body)
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)