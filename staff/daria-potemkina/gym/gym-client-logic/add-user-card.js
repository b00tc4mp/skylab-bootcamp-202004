require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (token, number, holder, expirationDate, cvv) {
    String.validate(token)
    String.validate(number)
    String.validate(holder)
    if(expirationDate instanceof Date === false) throw new TypeError ('expiration date is do not have a date format')
    String.validate(cvv)
    
    return call('POST', `${this.API_URL}/users/card`,
    `{ "number": "${number}", "holder": "${holder}", "expirationDate": "${expirationDate}", "cvv": "${cvv}" }`,
        { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return
            else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)