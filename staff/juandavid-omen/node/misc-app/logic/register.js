const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
require('../utils/json')
require('../utils/string')
const Email= require('../utils/email')
require('../utils/json')

module.exports = (newUser, callback) => {
    const {name, surname, email, password} = newUser

    String.validate.alphabetic(name)
    
    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 6)

    const id = uid()

    const file = `${id}.json`

    let emailFound;

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
        if(error) return callback(error)

        let wasError = false

        
        let count = 0
    
        files.forEach(file => {
            fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, json)=>{
                if(error) {
                    if(!wasError) {
                        callback(error)
                    }

                    return
                }

                if(!wasError){
                    const user = JSON.parse(json)

                    // const values = Object.values(user)

                    if(user.email === email) emailFound = true

                    if(++count === files.length) return
                }
            })
        })
    })
    if(!emailFound) {
    fs.writeFile(path.join(__dirname, '..', 'data','users', file), JSON.prettify(newUser), error => {
        if (error) throw error
        
        callback(null, emailFound)
    })
}

    // TODO check user is not already registered
}

