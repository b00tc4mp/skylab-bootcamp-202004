require("gluttony-commons/polyfills/string")
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require("gluttony-commons")
const { models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")
/**
 * @param  {string} email
 * @param  {string} password
 */
module.exports = (email, password) => {
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(password)

    return Users.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError("wrong password")

                    return user.id
                })
        })
}