/**
 * Add the product in the user portfolio
 * 
 * @param {string} productId The product id to add in the portfolio
 * @param {string} priceId The priceId of the product added
 * @param {string} side Buy or Sell the product
 * @param {string} quantity The quantity of the product added
 * 
 * @returns {Promise} Undefinded if it resolves, an error if it rejects
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (productId, priceId, side, quantity) {
    String.validate(productId)
    String.validate(priceId)
    String.validate(side)
    
    Number.validate.integer(quantity)

    const { token } = context.storage
    
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