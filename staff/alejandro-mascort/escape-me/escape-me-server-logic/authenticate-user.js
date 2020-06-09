const { errors: { CredentialsError, UnexistenceError }, utils: { Email } } = require("escape-me-commons")

require("escape-me-commons/polyfills/string")
const { models: { User } } = require('escape-me-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, user.password);

        if (!match) throw new CredentialsError('wrong password')

        return user._id.toString()
    })()
} 