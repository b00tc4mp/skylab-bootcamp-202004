const { users, contacts } = require('../data')
require("../utils/polyfills/function")
require("../utils/polyfills/string")
const {CredentialsError,UnexistenceError} = require('../errors');


module.exports = (userId, contactId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)

    return new Promise((resolve,reject)=>{
        users.find({id:userId},(error,[user])=>{
            if(error) return reject(error)
    
            if(!user) return reject(new UnexistenceError(`user with id ${userId} not found`))
    
            contacts.find({id:contactId},(error,_contacts)=>{
               
                const [contact]=_contacts
                if(!contact) return reject(new UnexistenceError(`contact with id ${contactId} not found`))
            
                if(error) return reject(error)
        
                if(userId!==contact.user) return reject(new CredentialsError("trying remove contacts from other user"))
           
                contacts.remove(contactId,(error)=>{
                    if(error) return reject(error)
                    return resolve(`Deleted contact ${contactId}`)
                })   
            })
        })
    })
}