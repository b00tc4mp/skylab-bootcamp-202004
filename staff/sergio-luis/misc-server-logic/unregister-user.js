
require('misc-commons/polyfills/function')
require("misc-commons/polyfills/string")
const {mongo} = require('misc-data')
const{errors:{CredentialsError,UnexistenceError},utils:{Email}}= require("misc-commons")
const bcrypt = require('bcryptjs')

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
                    
                    return bcrypt.compare(password,user.password)
                        .then(match =>{
                            if(!match) throw new CredentialsError('wrong password')
                    debugger
                            return users.deleteOne(user)
                        })
                        .then(() => `Deleted user ${email}`)
                })
                
        })   
}