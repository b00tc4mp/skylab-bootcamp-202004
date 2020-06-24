/**
 * Checks user credentials.
 * 
 * @param {string} workspaceId The workspace id. 
 * @param {number} stars The punctuation for the workspace. 
 * @param {string} text The user review for the workspace.
 * 
 * @returns {Promise<String>} Nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If review was not successfuly posted.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
require('nomad-commons/polyfills/number')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId, stars, text) {
    String.validate.notVoid(workspaceId)
    Number.validate(stars)
    String.validate.notVoid(text)

    const review = { workspaceId, stars, text }


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }
            const result = await call(
                'POST',
                `${this.API_URL}/reviews`,
                JSON.stringify(review),
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