const { users, stickies } = require('../data')
require("../utils/polyfills/function")
require("../utils/polyfills/string")


module.exports = (userId, stickyId, callback) => {
    
    String.validate.notVoid(userId)
    String.validate.notVoid(stickyId)
    Function.validate(callback)


    users.find({ id:userId },(error, [user]) => {
        if (error) return callback(error)
        
        if (!user) return callback(new Error(`user with id: ${userId}, does not exist`))

        stickies.find({id:stickyId},(error, [sticky]) => {
            
            if (error) return callback(error)

            if (!sticky) return callback(new Error(`this ${stickyId} does not exist`))
            
            if(userId!==sticky.user) return callback(new Error("trying remove stickies from other user"))
       
            stickies.remove(stickyId,(error)=>{
                if(error) return callback(error)
                return callback(null, `Deleted sticky ${stickyId}`)
            })   
        })
    })
}
