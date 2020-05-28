const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')

module.exports = (sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)

    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    let { name, comment } = sticky
    comment = decodeURIComponent(comment)

    if (name)
        String.validate.notVoid(name)

    if (comment)
        String.validate.notVoid(comment)


    const id = uid()

    const file = `${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(sticky), error => {
        if (error) return callback(error)

        callback(null)
    })
}