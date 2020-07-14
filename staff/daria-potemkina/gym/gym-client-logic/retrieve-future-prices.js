/**
 * Retrive prices of the futures
 * 
 * @param {string} futureId The id of the future
 * 
 * @returns {Promise<Array>} The array of prices of the future if it resolves, an error if it rejects
 * 
 * @throws {TypeError} If the parameter does not match the corresponding type.
 * @throws {Error} If the parameter is empty.
 * 
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function (futureId) {
    String.validate.notVoid(futureId)
    
    return call('GET', `${this.API_URL}/price?productId=${futureId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                let results = JSON.parse(body)

                return results.sort((a, b) => {
                    a.date = moment(a.date.split('T')[0]).format('DD-MMMM-YY');
                    b.date = moment(b.date.split('T')[0]).format('DD-MMMM-YY');
                    
                    return (new Date(a.date) - new Date(b.date))
                })

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)