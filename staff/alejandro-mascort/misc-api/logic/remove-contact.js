require('../utils/polyfills/string')
require('../utils/polyfills/function')
const fs = require('fs')
const path = require('path')
const {find} =require('../data')

const { UnexistenceError} = require('../errors')

module.exports = (userId, contactId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)

    return new Promise((resolve, reject) => {
        find({ id:userId }, 'users',(error, users) => {
            if (error) return reject(error)
            
            const [user] = users

            if (!user) return reject(new UnexistenceError(`user with id: ${userId}, does not exist`))
    
            find({contactId}, 'contacts', (error, contacts) => {
                
                if (error) return reject(error)

                const [contact] = contacts
    
                if (!contact) return reject(new UnexistenceError(`this ${contactId} does not exist`))
    
                fs.unlink(path.join(__dirname, "..", "data", "contacts", `${contactId}.json`), (error) => {
                    if (error) return reject(error)
    
                    resolve()
                })
            })
        })
    })
}