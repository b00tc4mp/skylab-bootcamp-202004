/**
 * Retrieves workspaces array sorted by location.
 * 
 * @param {object} location Object including latitude & longitude for the position to retrieve. 
 * @param {string} filter Optional parameter for retrieving workspaces that matches category property. 
 * 
 * @returns {Promise<String>} The workspace objects array up to length 20 if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If can not find any workspace by location, or other unexpected errors.
 */

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
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)