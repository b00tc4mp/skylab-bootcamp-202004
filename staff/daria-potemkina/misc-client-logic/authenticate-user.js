require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (email, password) => {
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    return call('POST', 'http://localhost:8080/users/auth',
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, response }) => {
            if (status !== 200) throw new Error({ response: { error } })
            const { token } = JSON.parse(response)
            return token
        })

}
