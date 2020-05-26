require('../utils/string')
require('../utils/function')
const { find } = require('../data')

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)
    Function.validate(callback)

    find({ id: userId }, 'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        delete user.id
        delete user.password

        callback(null, user)
    })
}