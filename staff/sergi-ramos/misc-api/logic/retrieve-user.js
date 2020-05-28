require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { users: { find } } = require('../data')
const { UnexistenceError } = require('../errors')

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)
    Function.validate(callback)

    find({ id: userId }, (error, users) => {
        if (error) return callback(error)

        const [user] = users

        if (!user) return callback(new UnexistenceError(`user with id ${userId} does not exist`))

        delete user.id
        delete user.password

        callback(null, user)
    })
}