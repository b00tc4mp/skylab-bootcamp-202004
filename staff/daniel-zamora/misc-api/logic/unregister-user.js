require('../utils/polyfills/string')
const Email = require('../utils/email')
const { UnexistenceError, CredentialsError } = require('../errors')
const { mongo } = require('../data')

module.exports = ( email, password, userId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(password)
    Email.validate(email)

    return mongo.connect()
        .then(connection => { debugger
            const users = connection.db().collection('users')
            
            return users.findOne({ email})
                .then(user =>{
                    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
                    if (user.password !== password || user._id.toString() !== userId) throw new CredentialsError('wrong password')
                    return users.deleteOne({_id : mongo.ObjectId(userId)})
                })
        })
        
}