require('code-this-commons/polyfills/string')
const { utils: { Email, call } } = require('code-this-commons')
const context = require('./context')

module.exports = function (email, password) {
    Email.validate(email)
    String.validate.notVoid(password)

    return call('POST', `${this.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                const { token } = JSON.parse(body)

                sessionStorage.token = token

                this.token = token
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)