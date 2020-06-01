require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users: { find, update } } = require('../data')

module.exports = (userId, name, surname, email, password, callback) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    find({ id: userId }, (error) => {
        if (error) return callback(error)

        const newUser = { name, surname, email, password }

        update(userId, newUser, error => {
            if (error) return callback(error)
            callback(null)
        })
    })
}