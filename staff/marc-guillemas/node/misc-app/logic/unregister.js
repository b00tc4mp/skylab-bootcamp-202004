const fs = require('fs')
const path = require('path')
const { find } = require('../data/users')
const Email = require('../utils/email')
require('../utils/polyfills/function')
require('../utils/polyfills/string')
require('../utils/polyfills/json')

module.exports = (email, password, callback) => {

    String.validate.lengthGreaterEqualThan(password, 8) 

    String.validate.notVoid(email)
    Email.validate(email)

    find({ email, password }, (error, [user]) => {
        if (error) return callback(error)
        if (!user) return callback( new Error('No users found'))


        fs.unlink(path.join(__dirname, '..', 'data', 'users', `${user.userId}.json`), error => {

            if (error) return callback(error)
            delete user.userId
            delete user.password

            callback(null, user)
        })
    })
}