require('cook-wise-commons/polyfills/string')
const { utils: { Email, call } } = require('cook-wise-commons')


module.exports = function (name, surname, email, password) {debugger
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return call(
        'POST',
        `http://192.168.0.19:8080/api/users`,
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body) 

            throw new Error(error)
        })
}