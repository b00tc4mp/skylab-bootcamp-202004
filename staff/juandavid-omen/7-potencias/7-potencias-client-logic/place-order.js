const { utils: { call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function () {
  const { token } = this.storage
  return call('POST', `${this.API_URL}/orders`, undefined, { Authorization: `Bearer ${token}` })
    .then(({ status, body }) => {
      if (status === 200) return JSON.parse(body)
      else {
        const { error } = JSON.parse(body)
        throw new Error(error)
      }
    })
}.bind(context)
