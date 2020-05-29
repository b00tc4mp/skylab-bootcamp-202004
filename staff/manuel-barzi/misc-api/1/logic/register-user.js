require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users: { find, create } } = require('../data')

module.exports = (name, surname, email, password, callback) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    find({ email }, (error, users) => {
        if (error) return callback(error)

        const [user] = users

        if (user) return callback(new Error(`user with e-mail ${email} already exists`))

        const newUser = { name, surname, email, password }

        create(newUser, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}