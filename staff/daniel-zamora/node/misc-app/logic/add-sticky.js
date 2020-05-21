const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (stiky, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    for (key in stiky) {
        String.validate.notVoid(key)
       }

    const id = uid()

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(stiky), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}
