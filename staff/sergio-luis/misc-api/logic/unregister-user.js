require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const {mongo} = require('../data')
const {CredentialsError,UnexistenceError} = require('../errors');


module.exports = (userId,email,password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return mongo.connect()
        .then(connection=>{
            const users = connection.db().collection('users')

            return users.findOne({email})
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
                    
                    if(user._id.toString() !== userId) throw new CredentialsError("trying to unregister other user")
                    //Will it work?
                    if (user.password !== password) throw new CredentialsError('wrong password')
                    debugger
                    return users.deleteOne(user)
                })
                .then(() => `Deleted user ${email}`)
        })   
}