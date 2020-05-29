require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { users: { find } } = require('../data')
const { UnexistenceError } = require('../errors')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return find({ id: userId })
        .then(users => {
            const [user] = users

            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            delete user.id
            delete user.password

            return user
        })
}