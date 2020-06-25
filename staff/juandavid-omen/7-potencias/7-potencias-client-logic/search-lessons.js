const { utils: { call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function () {
  return call('GET', `${this.API_URL}/lessons/search`, undefined, undefined)
    .then(({ status, body }) => {
      if (status === 200) return JSON.parse(body)
      else {
        const { error } = JSON.parse(body)

        throw new Error(error)
      }
    })
}.bind(context)
