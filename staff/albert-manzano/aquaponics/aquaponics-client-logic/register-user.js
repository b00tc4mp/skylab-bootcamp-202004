require('aquaponics-commons/polyfills/string')
const { utils: { Email, call, Password } } = require('aquaponics-commons')
const context = require('./context')
require('aquaponics-commons/polyfills/number')


module.exports = function (name, surname, email, password, _password, phone) {
    String.validate(name)
    String.validate.notVoid(name)
    String.validate(surname)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    if (password !== _password) throw new Error('password and confirmation do not match')
    Password.validate(password)
    String.validate.lengthGreaterEqualThan(password, 8)
    Number(phone)
    Number.validate(phone)
    const role="user"

    return call(
        'POST',
        `${this.API_URL}/users`,
        { name, surname, email, password,role, phone },
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return
            debugger

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)