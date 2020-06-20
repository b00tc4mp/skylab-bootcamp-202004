require('termometro-commons/polyfills/string')
const { models: { User } } = require('termometro-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('termometro-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`Este email no existe`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('Contraseña incorrecta')

                    return user.id
                })
        })
}