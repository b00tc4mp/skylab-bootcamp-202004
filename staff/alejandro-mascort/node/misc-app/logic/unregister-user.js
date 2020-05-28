const fs = require('fs')
const path = require('path')
const {find} = require('../data')
require('../utils/string')
require('../utils/function')
const Email = require('../utils/email')


module.exports = (date, callback) => {
    
    const {email,password} = date
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)

    find({ email }, 'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with e-mail ${email} does not exist`))

        if (user.password !== password) return callback(new Error('wrong password'))


        fs.unlink(path.join(__dirname, "..", "data", "users", `${user.id}.json`), (error) => {
            if (error) return callback(error)

            return callback(null, `Deleted user ${email}`)
        })
    })
}