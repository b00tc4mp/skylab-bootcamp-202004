require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('commons')
const { models: { User } } = require('data')
const bcrypt = require('bcryptjs')

module.exports = (username, email, password) => {
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new DuplicityError(`${email} is already in use`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash })
    })()
}