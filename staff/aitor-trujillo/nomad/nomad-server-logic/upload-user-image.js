require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const fs = require('fs')
const path = require('path')

module.exports = (userId, file, filename) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(filename)

    return (async () => {
        let saveTo = path.join(__dirname, `../nomad-api/public/users/${filename}.jpg`)
        await file.pipe(fs.createWriteStream(saveTo))
    })()
}