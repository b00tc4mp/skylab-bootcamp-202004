require('moove-it-commons/polyfills/string')
const { utils: { Email, call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function(email, password) {
    
    String.validate.notVoid(password)
    Email.validate(email)

    return call('POST', `${this.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' })


    .then(({ status, body }) => {
        if (status === 200) {
            const { token } = JSON.parse(body)

            this.storage.token = token

        } else {
            const { error } = JSON.parse(body)

            if (error) throw new Error(error)
        }
    })
}.bind(context)