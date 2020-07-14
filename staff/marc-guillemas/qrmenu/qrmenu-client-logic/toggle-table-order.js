require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')

/**
 * @param {string} token of the current worker
 * @param {string} tableId id of the table to activate
 */

module.exports = function (token, tableId) {

    String.validate.notVoid(token)
    String.validate.notVoid(tableId)
    
    return call('POST', `${this.API_URL}/open`,
        `{"tableId": "${tableId}"}`,
        { 'Content-type' : 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            
            if(status === 200) {
            
                const [,payloadBase64] = token.split('.')
    
                const payloadJson = atob(payloadBase64)
    
                const payload = JSON.parse(payloadJson)
    
                const {establishmentId} = payload
                
                return {establishmentId, tableId}
            }

            const {error} = JSON.parse(body)

            return error
            
        })
}.bind(context)