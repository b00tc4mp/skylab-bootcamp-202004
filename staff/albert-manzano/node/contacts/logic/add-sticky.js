const fs = require('fs')
const path = require('path')
require('../utils/string')
require('../utils/json')


module.exports = (message, callback) => {
    if (message)
        String.validate.notVoid(name)

    const id = Date.now
    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies',file), JSON.prettify(message), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}