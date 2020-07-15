/**
 * Sends image to upload for workspace.
 * 
 * @param {string} workspaceId The workspace id corresponding to image selected. 
 * @param {string} workspace The values submited in the image form, it includes image uri. 
 * 
 * @returns {Promise<String>} True if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If can not find the workspace by it's id, or other unexpected errors.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspaceId, workspace) {

    let data = new FormData()
    data.append("image", {
        name: "image1",
        type: "image/jpeg",
        uri: workspace.image1.uri,
    })


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            const result = await call(
                'POST',
                `${this.API_URL}/upload/${workspaceId}`,
                data,
                headers
            )
            const { status, body } = result

            if (status === 200) {
                return true
            }
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    })()
}.bind(context)