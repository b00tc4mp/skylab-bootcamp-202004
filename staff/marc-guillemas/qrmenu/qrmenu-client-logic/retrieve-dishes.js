require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')
/**
 * @param {string} establishmentId id of the establishment 
 * @param {string} tableId id of the table 
 */
module.exports = function (establishmentId, tableId) {
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(tableId)
    

    return call('GET', `${this.API_URL}/establishment/${establishmentId}/table/${tableId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            
            if(status === 200) {
                const {dishes} = JSON.parse(body)
                return dishes
            }

            const {error} = JSON.parse(body)

            return error
            
        })
}.bind(context)