/**
 * Saves workspaceId to user favorites array, or removes it if it's already included.
 * 
 * @param {string} workspaceId The workspace id to retrieve. 
 * 
 * @returns {Promise<String>} Nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If can not find the workspace by it's id, or other unexpected errors.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId) {

    String.validate.notVoid(workspaceId)


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
            const result = await call(
                'POST',
                `${this.API_URL}/favorites/add/${workspaceId}`,
                undefined,
                headers
            )

            const { status, body } = result

            if (status === 201) return
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)