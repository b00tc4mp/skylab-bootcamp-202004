require('../utils/string')
const Email = require('../utils/email')
const fs = require('fs')
const uid = require('../utils/uid')
require('../utils/function')
const path = require('path')
require('../utils/json')

function findUserByEmail(email, callback) {
    const data = path.join(__dirname, '..', 'data')

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

module.exports = (name, surname, email, password, callback) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    const data = path.join(__dirname, '..', 'data')

    findUserByEmail(email, (error, user) => {
        if (error) return callback(error)

        if (user) return callback(new Error(`user with e-mail ${email} already exists`))

        const newUser = { name, surname, email, password }

        const id = uid()

        fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
            if (error) return callback(error)

            callback(null, id)
        })
    })
}