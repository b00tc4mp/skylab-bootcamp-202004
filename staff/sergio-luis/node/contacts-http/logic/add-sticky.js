const fs = require('fs')
const path = require('path')
require('../utils/string')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)

    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    const { name, tag, message } = sticky

        String.validate.notVoid(name)

        String.validate.notVoid(tag)

        String.validate.notVoid(message)

    const id = uid()

    const file = `sticky-${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(sticky), error => {
        if (error) return callback(error)

        callback(null, id)
    })
}