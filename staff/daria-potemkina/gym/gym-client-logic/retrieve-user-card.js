/**
 * Retrieve user credit card
 * 
 * @return {Promise<Object>} The user card without cvv number if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If the token is empty.
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function () {
    const { token } = context.storage

    return call('GET', `${this.API_URL}/users/card`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                let card =  JSON.parse(body)

                card.expirationDate = moment(card.expirationDate).format('DD-MM-YYYY')

                return card

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)