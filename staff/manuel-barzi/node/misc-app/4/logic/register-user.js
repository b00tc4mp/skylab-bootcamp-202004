require('../utils/polyfills/string')
const { Email, uid } = require('../utils')
const fs = require('fs')
require('../utils/polyfills/function')
const path = require('path')
require('../utils/polyfills/json')
const { users: { find } } = require('../data')

module.exports = (name, surname, email, password, callback) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    const data = path.join(__dirname, '..', 'data')

    find({ email }, (error, [user]) => {
        if (error) return callback(error)

        if (user) return callback(new Error(`user with e-mail ${email} already exists`))

        const id = uid()

        const newUser = { id, name, surname, email, password }

        fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}