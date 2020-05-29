require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
const { users: { find } } = require('../data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
   
    
    return new Promise((resolve, reject) => {
        
        find({ email }, (error, [user]) => {
            if (error) return reject(error)
    
            if (!user) return reject(new Error(`user with e-mail ${email} does not exist`))
    
            if (user.password !== password) return reject(new Error('wrong password'))
    
            resolve(user.id)
        })
    })
} 