require('cook-wise-commons/polyfills/string')
const { models: { User } } = require('cook-wise-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('cook-wise-commons')
const bcrypt = require('bcryptjs') 

module.exports = (email, password) => {debugger
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user.id
                })
        })
} 