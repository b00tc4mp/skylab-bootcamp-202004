require('../utils/string')
require('../utils/function')
const { find } = require('../data/findData')

module.exports = (userId, stickieId, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)
    Function.validate(callback)

    find({ id: userId }, 'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        find({ stickieId }, 'stickies',(error, [stickie]) => {
            if (error) return callback(error)
    
            if (!stickie) return callback(new Error(`stickie with id ${stickieId} does not exist`))
    
            callback(null, stickie)
        })
    })
}
