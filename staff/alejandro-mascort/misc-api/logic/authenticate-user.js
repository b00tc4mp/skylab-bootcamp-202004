const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')
const { find } = require('../data')
const { UnexistenceError, CredentialsError } = require('../errors')

module.exports = (date) => {
    
    const {email,password} = date
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return new Promise((resolve, reject) => {
        find({ email }, 'users',(error, users) => {
            if (error)  reject(error)

            const [user] = users
    
            if (!user) return reject(new UnexistenceError(`user with e-mail ${email} does not exist`))
    
            if (user.password !== password) return reject(new CredentialsError('wrong password'))
    
            resolve(user.id)
        })
    })
}