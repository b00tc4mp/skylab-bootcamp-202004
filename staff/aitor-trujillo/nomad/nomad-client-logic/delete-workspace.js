/**
 * Deletes existing workspace, only possible for it's creator.
 * 
 * @param {string} workspaceId The workspace id to delete. 
 * 
 * @returns {Promise<String>} Returns nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If could not delete the workspace.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId) {
    String.validate.notVoid(workspaceId)


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }
            const result = await call(
                'DELETE',
                `${this.API_URL}/workspaces/${workspaceId}`,
                undefined,
                headers
            )
            const { status, body } = result
            if (status === 200) return
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)