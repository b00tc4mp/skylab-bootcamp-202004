/**
 * Sends image to upload for workspace.
 * 
 * @param {string} userId The user id corresponding to image creator. 
 * @param {string} workspaceId The workspace id corresponding to image selected. 
 * @param {string} file The file sent to api. 
 * @param {string} filename The file name to save into public folder. 
 * 
 * @returns {Promise<String>} True if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const fs = require('fs')
const path = require('path')

module.exports = (userId, workspaceId, file, filename) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workspaceId)
    String.validate.notVoid(filename)

    return (async () => {
        let saveTo = path.join(__dirname, `../nomad-api/public/workspaces/${filename}.jpg`)
        await file.pipe(fs.createWriteStream(saveTo))
    })()
}