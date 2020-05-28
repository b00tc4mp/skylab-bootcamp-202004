require('../utils/string')
require('../utils/function')
const { find } = require('../data/users')

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)
    Function.validate(callback)

    find({userId}, (error, [user]) => {
        debugger
        if(error) return callback(error)
        if(!user) return callback(new Error(`user with id:${userId} does not exist`))
        debugger
        delete user.userId
        delete user.password
        callback(null, user)
    } )


}