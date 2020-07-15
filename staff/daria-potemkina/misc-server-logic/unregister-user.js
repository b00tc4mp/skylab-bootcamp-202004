require('misc-commons/polyfills/string')
const { models: { User } } = require('misc-data')
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            return User.deleteOne({ _id: userId })
        })
}
