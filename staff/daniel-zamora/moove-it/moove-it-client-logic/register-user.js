const { utils: { Email, call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
const context = require('./context')


module.exports = function(name, surname, email, password) {
    debugger
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)


    return call('POST', `${this.API_URL}/users`,
            `{"name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}"}`, { 'Content-type': 'application/json' })
        .then(({ status, body }) => {

            if (status === 201) return ('User crated')

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)