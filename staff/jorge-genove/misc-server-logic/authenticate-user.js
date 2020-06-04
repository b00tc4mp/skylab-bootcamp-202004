require('misc-commons/polyfills/string')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('misc-commons')
const { mongoose, model: { User } } = require('misc-data')
const bcrypt = require('bcryptjs')


module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)


return User.findOne({ email })

        .then(user => {
            if (!user) throw new UnexistenceError(`users with that ${email} already exist`)

            return bcrypt.compare(user.password, password)
                .then(comparison => {
                    if(comparison) return user.id

                    else throw new CredentialsError('wrong password')
                })
        })
}