const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')
const { find } = require('../data')


module.exports = (date) => {

    const { email, password } = date
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return new Promise((resolve, reject) => {
        find({ email }, 'users', (error, [user]) => {
            if (error) return reject(error)

            if (!user) return reject(new Error(`user with e-mail ${email} does not exist`))

            if (user.password !== password) return reject(new Error('wrong password'))

            resolve(user.id)
        })
    })
}