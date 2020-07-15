require('misc-commons/polyfills/string')
const{models: {User}, mongoose: {ObjectId}} = require('misc-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('misc-commons')
const bcrypt = require('bcryptjs')

module.exports = (userId, email, password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({_id: ObjectId(userId)}).lean()

    .then(user =>{
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        if (user.email !== email) throw new CredentialsError('wrong email') 

        return bcrypt.compare(password, user.password)
        .then(match => {
            if (!match) throw new CredentialsError('wrong password')
            
            return User.deleteOne({_id: ObjectId(userId)})

            .then(()=> {return `${email} deleted`})
        })
    })
}
