require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/json')
const { users: { find, create } } = require('../data')
const { DuplicityError } = require('../errors')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return find({ email })
        .then(users => {
            const [user] = users

            if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

            const newUser = { name, surname, email, password }

            return new Promise((resolve, reject) => {
                create(newUser, error => {
                    if (error) return reject(error)

                    resolve()
                })
            })
        })
}