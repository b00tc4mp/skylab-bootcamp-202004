const { users, contacts } = require('../data')
require('../utils/polyfills/function')
require('../utils/polyfills/string')

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)

    Function.validate(callback)

    users.find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)
        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        contacts.find({ user: userId }, (error, contacts) => {
            if (error) return callback(error)
            if (!stickies.length) return callback(new Error('stickies is empty'))

            callback(null, contacts)
        })
    })
}