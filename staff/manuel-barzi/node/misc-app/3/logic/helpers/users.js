require('../../utils/string')
const Email = require('../../utils/email')
const fs = require('fs')
require('../../utils/function')
const path = require('path')
require('../../utils/json')

function findUserByEmail(email, callback) {
    Email.validate(email)
    Function.validate(callback)

    const data = path.join(__dirname, '..', '..', 'data')

    fs.readdir(path.join(data, 'users'), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')

        if (!files.length) return callback(null, null)

        let i = 0;

        (function readFile() {
            fs.readFile(path.join(data, 'users', files[i]), 'utf8', (error, json) => {
                if (error) return callback(error)

                const existingUser = JSON.parse(json)

                if (existingUser.email === email) return callback(null, existingUser)

                if (++i < files.length) return readFile()

                callback(null, null)
            })
        })()
    })
}

module.exports = {
    findUserByEmail
}