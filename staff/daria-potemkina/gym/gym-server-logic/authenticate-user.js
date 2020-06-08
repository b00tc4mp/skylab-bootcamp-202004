require('gym-commons/polyfills/string')
const { utils: { Email } } = require('gym-commons')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError, CredentialsError } } = require('gym-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        const user = await User.findOne({ email })

        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new CredentialsError('wrong credentials')

        return user._id.toString()
    })()
}