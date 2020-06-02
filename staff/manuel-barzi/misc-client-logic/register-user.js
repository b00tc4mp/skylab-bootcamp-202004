require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (name, surname, email, password, callback) => {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    call('POST',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 201)
                callback()
            else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}