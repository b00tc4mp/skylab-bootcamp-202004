require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { DuplicityError } } = require('nomad-commons')
const fs = require('fs')
const path = require('path')

// const { models: { Workspace } } = require('nomad-data')

module.exports = (userId, workspaceId, file, filename) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(workspaceId)
    String.validate.notVoid(filename)

    console.log(userId, workspaceId, file, filename)

    return (async () => {
        let saveTo = path.join(__dirname, `../nomad-api/public/workspaces/${filename}.jpg`) //`../nomad-api/uploads/${workspaceId}/${filename}.jpg
        await file.pipe(fs.createWriteStream(saveTo))
    })()
}