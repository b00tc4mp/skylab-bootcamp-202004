require("gluttony-commons/polyfills/string")
const { utils: { Email, call } } = require("gluttony-commons")

module.exports = function (name, surname, email, password) {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    return call(
        'POST',
        `${process.env.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return

            debugger

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}