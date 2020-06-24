require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')


/**
 * Retrieve all users laundries.
 * 
 * @param {string} day Reservation day. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = function(day) {

  return (async () => {

    const token = await this.storage.getItem('TOKEN')

    const res = await call('GET', `${this.API_URL}/cohousings/laundry/${day}`, undefined, { 'Authorization': `Bearer ${token}` })

    if (res.status === 200) return JSON.parse(res.body)

    const { error } = JSON.parse(res.body)


    throw new Error(error)
  })()
}.bind(context)