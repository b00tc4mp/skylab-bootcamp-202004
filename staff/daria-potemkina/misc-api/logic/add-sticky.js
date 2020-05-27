require('../utils/polyfills/string')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users, stickies } = require('../data')

module.exports = (userId, sticky, callback) => {
    String.validate.notVoid(userId)
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    String.validate.notVoid(sticky.message)

    Function.validate(callback)

    users.find({ id: userId }, (error, [user]) => {

        if (error) return callback(error)
        if (!user) return callback(new Error('something wrong happen'))

        let text = sticky.message.replace(/\r?\n|\r/g, " ")

        sticky.message = text.split('+').join(' ')
        sticky.userId = userId

        stickies.create(sticky, (error, id) => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}