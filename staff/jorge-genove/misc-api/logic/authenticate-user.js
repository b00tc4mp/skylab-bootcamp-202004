require('../utils/polyfills/string')
const { Email } = require('../utils')
const { UnexistenceError, CredentialsError } = require('../errors')
const {mongo} = require('../data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')
        
            return users.findOne({email})
        })    
        .then(user => {
            if(!user) throw new UnexistenceError(`users with that ${email} already exist`)

            if(user.password !== password) throw new CredentialsError('Wrong password')

            return user._id.toString()
        })
} 