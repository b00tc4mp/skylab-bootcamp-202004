const path = require('path')
const Email = require('../utils/email')
const fs = require('fs')
require ('../utils/string')

module.exports = (userEmail, userPassword, callback) => {
    
    if(userEmail) {
        String.validate.notVoid(userEmail)
        Email.validate(userEmail)
    }

    if(password){
        String.validate.notVoid(userPassword)
    }

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) =>{
        if(error) return callback(error)

        let wasError = false

        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..','data','users', file), 'utf8', (error, json) =>{
                if(error){
                    if(!wasError){
                        callback(error)

                        wasError = true
                    }
                    return
                } if(!wasError){
                    
                    const user = JSON.parse(json)

                    const { email, password, id, name } = user

                    if (userEmail === email && userPassword === password){

                        return callback(null, (id, name))

                    } else {
                        
                        return callback('Wrong credentials')
                    }
                }
            })
        })
    })

}