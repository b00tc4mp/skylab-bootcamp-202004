require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
require('../utils/polyfills/json')
const { find } = require('../data')
const mongo = require('../data/mongo')

const { UnexistenceError, CredentialsError } = require('../errors')

module.exports = (date) => {
    
    const {email,password} = date
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ email })
        })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new CredentialsError('wrong password')

            return user._id.toString()
        })   
}