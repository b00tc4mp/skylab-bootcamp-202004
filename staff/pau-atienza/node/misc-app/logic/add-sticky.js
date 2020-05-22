const fs = require('fs')
const path = require('path')
require('../utils/string')
require('../utils/json')
require('../utils/function')

module.exports = (sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    Function.validate(callback)

    const { name, tag, comment, id } = sticky

    String.validate.notVoid(name)
    String.validate.notVoid(tag)
    String.validate.notVoid(comment)
    String.validate.notVoid(id)

    const file = `sticky-${id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'stickies', file), JSON.prettify(sticky), error => {
        if (error) return callback(error)

        callback(null, id)
    })
} 