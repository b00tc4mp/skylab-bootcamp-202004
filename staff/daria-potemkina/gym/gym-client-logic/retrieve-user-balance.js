/**
 * Retrieve user balance
 * 
 * @returns {Promise<Array>} The array with user account balance with historic movements if it resolves, an erroor if it rejects.
 * 
 * @throws {TypeError} If the parameter does not match the format.
 * @throws {Error} If the the token is empty.
 */


require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function () {
    const { token } = context.storage

    return call('GET', `${this.API_URL}/users/balance`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                let results =  JSON.parse(body)

                return results = results.map(item => {
                    item.date = moment(item.date).format('DD-MMMM-YYYY')
                    return item
                })

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)