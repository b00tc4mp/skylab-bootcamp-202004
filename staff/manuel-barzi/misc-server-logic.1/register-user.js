require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('misc-commons')
const { models: { User } } = require('misc-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({ email })
        .then(user => {
            if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(hash => User.create({ name, surname, email, password: hash }))
        .then(() => { })
}