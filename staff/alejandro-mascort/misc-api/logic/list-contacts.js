const fs = require('fs')
const path = require('path')
const {find} = require('../data');
require('../utils/polyfills/string')
require('../utils/polyfills/function')

const { UnexistenceError } = require('../errors')

module.exports = (userId) => {

    String.validate.notVoid(userId)

    return new Promise ((resolve, reject) => {
        find({id:userId},'users',(error, users) => {
            if (error) return reject(error)
    
            const [user] = users

            if (!user) return reject(new UnexistenceError(`user with ${userId} does not exist`))
    
            
            fs.readdir(path.join(__dirname, '..', 'data','contacts'), (error, files) => {
                if (error) return reject(error)
    
                let wasError = false
                let count = 0;
                const contacts = []
    
                files = files.filter(file => path.extname(file) === '.json')
    
                if (!files.length) resolve(contacts)
        
                files.forEach(file => {
                    fs.readFile(path.join(__dirname, '..', 'data', 'contacts', file), 'utf8', (error, json) => {
                        if (error) {
                            if (!wasError) {
                                reject(error)
    
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
                            if (count === files.length) resolve(contacts)
                          
                        }
                    })
                })
            })
        })
    })

    

    


    
    

        
}