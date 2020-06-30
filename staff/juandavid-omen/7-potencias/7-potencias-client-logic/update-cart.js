const { utils: { call } } = require('7-potencias-commons')
const context = require('./context')
require('7-potencias-commons/polyfills/number')
require('7-potencias-commons/polyfills/string')
module.exports = function (productId, quantity = 1) {
  const { token } = this.storage

  String.validate(productId)
  Number.validate(quantity)

  return call('PUT', `${this.API_URL}/carts`, `{ "productId": "${productId}", "quantity": ${quantity} }`, { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' })
    .then(({ status, body }) => {
      if (status === 200) return JSON.parse(body)
      else {
        const { error } = JSON.parse(body)

        throw new Error(error)
      }
    })
}.bind(context)
