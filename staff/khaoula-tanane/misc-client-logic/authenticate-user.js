require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (email, password) => {
    Email.validate(email)

    String.validate.notVoid(password)
    return call('POST', 'http://localhost:8080/users/auth',
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                const { token } = JSON.parse(body)

                return token
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}