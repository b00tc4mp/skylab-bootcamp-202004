const fs = require('fs')
const path = require('path')
require('../utils/string')
require('../utils/json')
require('../utils/function')
const uid = require('../utils/uid')

module.exports = (sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    Function.validate(callback)

    const {tag, comment, id } = sticky
    String.validate.notVoid(tag)
    String.validate.notVoid(comment)
    String.validate.notVoid(id)

    const file = `sticky-${uid()}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(sticky), error => {
        if (error) return callback(error)

        callback(null, id)
    })
} 