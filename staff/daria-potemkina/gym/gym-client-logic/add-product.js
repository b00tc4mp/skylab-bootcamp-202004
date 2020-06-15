require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (token, productId, priceId, side, quantity) {
    String.validate(token)
    String.validate(productId)
    String.validate(priceId)
    String.validate(side)
    
    Number.validate.integer(quantity)
    
    return call('POST', `${this.API_URL}/users/product`,
    `{ "productId": "${productId}", "priceId": "${priceId}", "side": "${side}", "quantity": ${quantity} }`,
        { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) return
            else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)