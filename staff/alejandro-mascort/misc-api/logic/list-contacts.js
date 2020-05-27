const fs = require('fs')
const path = require('path')
const {find} = require('../data');
require('../utils/polyfills/string')
require('../utils/polyfills/function')

module.exports = (userId, callback) => {

    String.validate.notVoid(userId)
    Function.validate(callback)

    find({id:userId},'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with ${userId} does not exist`))

        
        fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
            if (error) return callback(error)

            let wasError = false
            let count = 0;
            const contacts = []

            files = files.filter(file => path.extname(file) === '.json')

            if (!files.length) callback(null, contacts)
    
            files.forEach(file => {
                fs.readFile(path.join(__dirname, '..', 'data', 'contacts', file), 'utf8', (error, json) => {
                    if (error) {
                        if (!wasError) {
                            callback(error)

                            wasError = true
                        }
                        return
                    }
    
                    if (!wasError) {

                        const contact = JSON.parse(json)
    
                        if(contact.user === userId){
                            contact.id = file.substring(0, file.indexOf('.json'))
    
                            contacts.push(contact)
        
                        }
                        count++
                        if (count === files.length) callback(null, contacts)
                      
                    }
                })
            })
        })

    })
    

    


    
    

        
}