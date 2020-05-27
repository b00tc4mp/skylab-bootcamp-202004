const { users, contacts } = require('../data')
require("../utils/polyfills/function")
require("../utils/polyfills/string")


module.exports = (userId, contactId, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)
    Function.validate(callback)
debugger
    users.find({id:userId},(error,[user])=>{
        if(error) return callback(error)

        if(!user) return callback(new Error(`user with id ${userId} not found`))

        contacts.find({id:contactId},(error,[contact])=>{
            if(error) return callback(error)
    
            if(userId!==contact.user) return callback(new Error("trying remove contacts from other user"))
       
            contacts.remove(contactId,(error)=>{
                if(error) return callback(error)
                return callback(null, `Deleted contact ${contactId}`)
            })   
        })
    })
}