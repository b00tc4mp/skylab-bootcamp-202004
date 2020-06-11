require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('commons')
const { models: { Admin } } = require('data')
const bcrypt = require('bcryptjs')

module.exports = (username, email, password) => {
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const admin = await Admin.findOne({ email })

        if (admin) throw new DuplicityError(`${email} is already in use`)

        const hash = await bcrypt.hash(password, 10)

        await Admin.create({ username, email, password: hash })
    })()
}