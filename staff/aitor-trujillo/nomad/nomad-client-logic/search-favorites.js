/**
 * Search workspaces that matches a query, by name, city or country in user favorites.
 * 
 * @param {string} query The query to filter workspaces and retrieve. 
 * 
 * @returns {Promise<String>} Workspace array if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If there is no results for the query, user has no favorites, or other unexpected errors.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (query) {
    String.validate(query)
    if (query === '') return

    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }

            const result = await call(
                'GET',
                `${this.API_URL}/favorites/search/${query}/`,
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