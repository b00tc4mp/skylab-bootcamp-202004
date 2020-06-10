require('moove-it-commons/polyfills/string')
const {utils: { Email }, errors: {UnexistenceError, CredentialsError} } = require('moove-it-commons')
const { mongo } = require('moove-it-data')

module.exports = ( email, password, userId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(password)
    Email.validate(email)

    return mongo.connect()
        .then(connection => { 
            const users = connection.db().collection('users')
            
            return users.findOne({ email})
                .then(user =>{
                    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
                    if (user.password !== password || user._id.toString() !== userId) throw new CredentialsError('wrong password')
                    return users.deleteOne({_id : mongo.ObjectId(userId)})
                })
        })
        
}