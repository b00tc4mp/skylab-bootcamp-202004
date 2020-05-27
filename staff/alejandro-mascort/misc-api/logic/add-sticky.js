require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/function')
const { Email } = require('../utils')
const { users, stickies } = require('../data')

module.exports = (userId, sticky, callback) => {
    String.validate.notVoid(userId)
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    Function.validate(callback)

    // TODO make it so that at least should have the following fields: (name || suranme) && (email || phone)

    const { title, message } = sticky

    if (title)
        String.validate.notVoid(title)

    if (message)
        String.validate.notVoid(message)

    users.find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${userId} not found`))

        sticky.user = userId

        stickies.create(sticky, (error, id) => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}