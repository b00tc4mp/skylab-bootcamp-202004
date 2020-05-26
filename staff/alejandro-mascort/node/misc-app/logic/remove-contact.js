require('../utils/string')
require('../utils/function')
const fs = require('fs')
const path = require('path')
const {find} =require('../data')



module.exports = (userId, contactId, callback) => {



    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)
    Function.validate(callback)


    find({ id:userId }, 'users',(error, [user]) => {
        if (error) return callback(error)
        
        if (!user) return callback(new Error(`user with id: ${userId}, does not exist`))

        find({contactId}, 'contacts', (error, [contact]) => {
            
            if (error) return callback(error)

            if (!contact) return callback(new Error(`this ${contactId} does not exist`))

            fs.unlink(path.join(__dirname, "..", "data", "contacts", `${contactId}.json`), (error) => {
                if (error) return callback(error)

                return callback(null, `Deleted user`)
            })
        })
    })
}