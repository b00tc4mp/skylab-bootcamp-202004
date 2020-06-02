require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
const { UnexistenceError, CredentialsError } = require('../errors')
const { mongo } = require('../data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

debugger
    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
            debugger
            return users.findOne({ email })
        })
        .then(user => {
            if (!user) throw new UnexistenceError('user does not exist')
            if (user.email === email && user.password === password) {
                return user._id.toString()
            } else {
                throw new CredentialsError('wrong credentials')
            }
        })
}  