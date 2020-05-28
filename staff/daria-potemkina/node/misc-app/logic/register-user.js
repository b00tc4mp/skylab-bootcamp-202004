const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')
const { find } = require('../data/users')


module.exports = (name, surname, email, password, callback) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)

    String.validate.notVoid(email)
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    find({ email }, (error, [user]) => {
        if (error) return callback(error)

        if (user) return callback(new Error(`user with ${email} is already exists`))

        const id = uid()

        const newUser = { id, name, surname, email, password }

        fs.writeFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`), JSON.prettify(newUser), error => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}