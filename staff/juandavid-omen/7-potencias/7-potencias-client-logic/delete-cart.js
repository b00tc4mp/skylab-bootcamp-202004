const { utils: { call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function (token) {
  return call('DELETE', `${this.API_URL}/carts`, undefined, { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' })
    .then(({ status }) => {
      if (status !== 200) {
        const { error } = JSON.parse()

        throw new Error(error)
      }
    })
}.bind(context)
