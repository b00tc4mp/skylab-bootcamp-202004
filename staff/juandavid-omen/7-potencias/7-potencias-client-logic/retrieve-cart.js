const { utils: { call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function () {
  const { token } = this.storage

  return call('GET', `${this.API_URL}/carts`, undefined, { Authorization: `Bearer ${token}` })
    .then(({ status, body }) => {
      if (status === 200) {
        const cart = JSON.parse(body)
        return cart
      } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
      }
    })
}.bind(context)
