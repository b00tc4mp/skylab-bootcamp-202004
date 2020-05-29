require('../utils/polyfills/string')
const { Email } = require('../utils')
const { users: { find } } = require('../data')
const { UnexistenceError, CredentialsError } = require('../errors')


module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return find({ email })
        .then(users => {    
            const [user] = users
    
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
    
            if (user.password !== password) throw new CredentialsError('wrong password')
    
            return user.id
        })
   
} 