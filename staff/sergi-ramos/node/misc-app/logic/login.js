const fs = require('fs')
const path = require('path')
const Email = require('../utils/email')
require('../utils/string')



module.exports = (email, password, callback) => {

    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    fs.readdir(path.join(__dirname, '..', 'data', 'users'), (error, files) => {
        if (error) throw new Error(error)

        let count = 0
        if (files.length) {

            (function foreach() {
                fs.readFile(path.join(__dirname, '..', 'data', 'users', file), (error, data) => {
                    debugger

                    data = JSON.parse(data)
                    if (error) throw new Error(error)

                    const { email: _email, password: _password } = data

                    if (email !== _email && password !== _password) return foreach()

                    if (email === _email && password === _password) return callback(null, path.basename(file))
                    if (++count === files.length) return callback(new Error('wrong credentials'))
                })

            })()
        } else {
            callback(new Error('no user'))
        }
    })
}




