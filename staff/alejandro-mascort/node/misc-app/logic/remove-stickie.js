require('../utils/string')
require('../utils/function')
const fs = require('fs')
const path = require('path')
const {find} =require('../data')



module.exports = (userId, stickieId , callback) => {
    
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)
    Function.validate(callback)


    find({ id:userId }, 'users',(error, [user]) => {
        if (error) return callback(error)
        
        if (!user) return callback(new Error(`user with id: ${userId}, does not exist`))

        find({stickieId}, 'stickies', (error, [stickie]) => {
            
            if (error) return callback(error)

            if (!stickie) return callback(new Error(`this ${stickieId} does not exist`))

            fs.unlink(path.join(__dirname, "..", "data", "stickies", `${stickieId}.json`), (error) => {
                if (error) return callback(error)

                return callback(null, `Deleted tag!`)
            })
        })
    })
}