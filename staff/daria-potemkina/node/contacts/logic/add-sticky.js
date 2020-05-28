const fs = require('fs')
const path = require('path')
const uid =require('../utils/uid')
require('../utils/string')

module.exports = (sticky, callback) =>{
    const id = uid()
    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.stringify(sticky), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}