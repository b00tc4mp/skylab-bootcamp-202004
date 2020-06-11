require('termometro-commons/polyfills/string')
const { utils: { Email, call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (name, surname, age, sex, email, password, token) {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)


    return !token?
    call(
        'POST',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}","email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
    :
    call(
        'POST',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}","email": "${email}", "password": "${password}" }`,
        ({ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

    )
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)