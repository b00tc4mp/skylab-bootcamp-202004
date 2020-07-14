/**
 * Add user credit card
 * 
 * @param {string} number The number of the user credit card.
 * @param {string} holder The name and surname of the holder of the credit card.
 * @param {date} expirationDate The expiration date of the credir card.
 * @param {string} cvv The cvv of the user credit card.
 * 
 * @returns {Promise} Undefined if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (number, holder, expirationDate, cvv) {
    String.validate(number)
    String.validate(holder)
    if(expirationDate instanceof Date === false) throw new TypeError ('expiration date is do not have a date format')
    String.validate(cvv)

    const { token } = context.storage
    
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