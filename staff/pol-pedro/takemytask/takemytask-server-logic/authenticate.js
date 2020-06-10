require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { utils: { Email }, errors: { CredentialsError } } = require('takemytask-commons')
const { models: { User } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new CredentialsError(`Wrong email or password`)

        const hash = await bcrypt.compare(password, user.password)

        if (!hash) throw new CredentialsError(`Wrong email or password`)

        return user.id
    })()
}