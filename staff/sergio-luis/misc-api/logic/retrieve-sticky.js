require('../utils/polyfills/string')
require('../utils/polyfills/function')
const {users,stickies}= require("../data")

module.exports = (userId, stickieId, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)
    Function.validate(callback)

    users.find({ id: userId },(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        stickies.find({ id: stickieId  },(error, [stickie]) => {
            if (error) return callback(error)
            
            if (!stickie) return callback(new Error(`stickie with id ${stickieId} does not exist`))

            if(stickie.user!==userId) return callback(new Error("that's not your sticky 😡"))
    
            callback(null, stickie)
        })
    })
}
