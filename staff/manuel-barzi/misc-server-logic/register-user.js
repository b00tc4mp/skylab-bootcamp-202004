require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('misc-commons')
const { mongo } = require('misc-data')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ email })
                .then(user => {
                    if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

                    return users.insertOne({ name, surname, email, password })
                })
        })
}