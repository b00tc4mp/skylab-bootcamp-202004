require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { utils: { Email }, errors: { CredentialsError } } = require('takemytask-commons')
const { models: { User , Worker} } = require('takemytask-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    let user = null

    return (async () => {
        user = await User.findOne({ email })
        if (!user)  {
            user = await Worker.findOne({ email })
        }

        if (!user) throw new CredentialsError(`Wrong email or password`)

        const hash = await bcrypt.compare(password, user.password)

        if (!hash) throw new CredentialsError(`Wrong email or password`)

        return user.id
    })()
}