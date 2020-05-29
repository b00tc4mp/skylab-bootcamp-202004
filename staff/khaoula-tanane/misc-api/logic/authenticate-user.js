require('../utils/polyfills/string')
const { Email } = require('../utils')
const { users: { find } } = require('../data')
const { UnexistanceError, CredentialsError } = require('../errors/')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    // Function.validate(callback)

return new Promise((resolve, reject)=> {

    find({ email }, (error, [user]) => {
        if (error) return reject(error)
        
        if (!user) return reject(new UnexistanceError(`user with e-mail ${email} does not exist`))
        
        if (user.password !== password) return reject(new CredentialsError('wrong password'))
        
        resolve(user.id)
    })
})

} 