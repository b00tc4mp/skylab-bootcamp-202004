require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')

module.exports = function (token, tableId) {

    String.validate.notVoid(token)
    String.validate.notVoid(tableId)
    debugger
    return call('POST', `${this.API_URL}/open`,
        `{"tableId": "${tableId}"}`,
        { 'Content-type' : 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            debugger
            if(status === 200) {
            
                const [,payloadBase64] = token.split('.')
    
                const payloadJson = atob(payloadBase64)
    
                const payload = JSON.parse(payloadJson)
    
                const {establishmentId} = payload
                debugger
                return {establishmentId, tableId}
            }

            const {error} = JSON.parse(body)

            return error
            
        })
}.bind(context)