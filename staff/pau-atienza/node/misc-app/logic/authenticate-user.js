const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
require('../utils/function')

module.exports = (credentials, callback) => {
    if (typeof credentials !== 'object') throw new TypeError(`${credentials} is not an object`)

    const {email, password} = credentials
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
        if (error) return callback(error)

        let wasError = false
        let wasMatch = false
        let count = 0

        files.forEach(file => {

            if (!files.length) callback(null, false)

            fs.readFile(path.join(__dirname, '..', 'data', 'users', file), 'utf8', (error, json) => {
                if (error) {
                    if (!wasError) {
                        callback(error)

                        wasError = true
                    }
                    return
                }

                if (!wasError && !wasMatch) {
                    const user = JSON.parse(json)

                    if (user.email === email && user.password === password) {
                        
                        wasMatch = true
                        callback(null, {username: user.username, email: user.email, id: user.id})
                    }
                    else if (++count === files.length) callback(null, false)
                }
            })
        })
    })
} 