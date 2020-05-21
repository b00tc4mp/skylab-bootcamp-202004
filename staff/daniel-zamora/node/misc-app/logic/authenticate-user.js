const path = require('path')
const Email = require('../utils/email')
const fs = require('fs')
require ('../utils/string')

module.exports = (userEmail, userPassword, callback) => {
    
    if(userEmail) {
        String.validate.notVoid(userEmail)
        Email.validate(userEmail)
    }

    if(userPassword){
        String.validate.notVoid(userPassword)
    }

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) =>{
        if(error) return callback(error)

        let isAuthenticated = false
        let count = 0
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..','data','users', file), 'utf8', (error, json) =>{ debugger
                if(error) return callback(error)
                   
                if(!isAuthenticated){
                    
                    count++
                    const user = JSON.parse(json)

                    const { email, password, id, name } = user
     
                    if (userEmail === email && userPassword === password){

                        isAuthenticated = true                        
                        
                        return callback(null, {name, id})

                    } 
                } if(count === files.length && !isAuthenticated)
                    return callback('Wrong credentials')
            })
        })
        
    })

}