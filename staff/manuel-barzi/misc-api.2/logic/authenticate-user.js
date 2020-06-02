require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
const { users: { find } } = require('../data')
const { UnexistenceError, CredentialsError } = require('../errors')

module.exports = (email, password, callback) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    find({ email }, (error, users) => {
        if (error) return callback(error)

        const [user] = users

        if (!user) return callback(new UnexistenceError(`user with e-mail ${email} does not exist`))

        if (user.password !== password) return callback(new CredentialsError('wrong password'))

        callback(null, user.id)
    })
} 