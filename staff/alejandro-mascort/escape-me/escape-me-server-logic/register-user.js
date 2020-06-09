require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('escape-me-commons')
const { models: { User } } = require('escape-me-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, username, email, password) => {
    if (name) String.validate.notVoid(name)
    if (surname) String.validate.notVoid(surname)
    String.validate.notVoid(username)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password);

    return (async () => {
        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) throw new DuplicityError(`user with email or username provided already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, username, password: hash })
    })()
}