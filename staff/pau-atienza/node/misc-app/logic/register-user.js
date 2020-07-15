const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
require('../utils/polyfills/json')
const {uid, Email} = require('../utils')

module.exports = (user, callback) => {
    if (typeof user !== 'object') throw new TypeError(`${user} is not an object`)

    const { username, email, password } = user
    
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    user.id = uid()

    const file = `${user.id}.json`

    fs.writeFile(path.join(__dirname, '..', 'data', 'users', file), JSON.prettify(user), error => {
        if (error) return callback(error)

        callback(null, user.id)
    })
}