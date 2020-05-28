const fs = require('fs')
const path = require('path')
const Email = require('../utils/email')
const { find } = require('../data/users')
const uid = require('../utils/uid')
require('../utils/function')
require('../utils/json')
require('../utils/string')


module.exports = (newUser, callback) => {

    const { name, surname, email, password } = newUser
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    String.validate.lengthGreaterEqualThan(password, 8) 
    
    const id = uid()

    const data = path.join(__dirname, '..', 'data')

    find({ email }, (error, [user]) => {

        if (error) return callback(error)

        if (user) return callback(new Error('user already exists'))

        newUser.userId = id

        fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
            if (error) return callback(error)
        })

        callback(null, id)
    })
}