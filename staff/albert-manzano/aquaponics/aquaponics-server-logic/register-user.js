require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/json')
require('aquaponics-commons/polyfills/numbers')
const { utils: { Email }, errors: { DuplicityError } } = require('aquaponics-commons')
const { model: {User} } = require('aquaponics-data')
const bcrypt = require('bcryptjs')


module.exports = (name, surname, email, password, _password, role, phone) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Number.validate(phone)
    String.validate(role)
    const confirmed = false
    const status = enabled

    if(password !== _password) throw new Error('passwords introduced do not match each other')

    // const users = connection.db().collection('users')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(hash => User.create({ name, surname, email, password: hash , phone, role, confirmed, status}))
        .then(() => {})
        
}