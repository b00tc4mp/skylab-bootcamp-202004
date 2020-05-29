require('../utils/polyfills/string')
const { Email } = require('../utils/')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users: { find, create } } = require('../data')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return new Promise((resolve, reject) => {
        find({ email }, (error, [user]) => {
            if (error) return reject(error)
    
            if (user) return reject(new Error(`user with e-mail ${email} already exists`))
    
            const newUser = { name, surname, email, password }
    
            create(newUser, error => {
                if (error) return reject(error)
    
                resolve()
            })
        })
    })
}