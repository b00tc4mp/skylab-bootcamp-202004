require('qrmenu-commons/polyfills/string')
const {utils: {Email, NIF, call}} = require('qrmenu-commons')
const context = require('./context')

module.exports = function(establishment, nif, email, password ){
    String.validate(establishment)
    NIF.validate(nif)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    debugger
    return call(
        'POST',
        `${this.API_URL}/establishment`,
        `{"establishment": "${establishment}", "nif":"${nif}", "email":"${email}", "password": "${password}"}`,
        {'Content-type' : 'application/json'}
    )
    .then(({status, body}) => {
        debugger
        if(status === 201) return

        const {error} = JSON.parse(body)

        throw new Error(error)
    })
}.bind(context)