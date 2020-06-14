require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError, CredentialsError }, utils: { Email } } = require('moove-it-commons')
const { models: { User } } = require('moove-it-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        debugger
        const user = await User.findOne({ email })

        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new CredentialsError('wrong password')

        return user.id
    })()
}