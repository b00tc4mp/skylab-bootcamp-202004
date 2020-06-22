require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')

module.exports = function (establishmentId, tableId) {
    console.log(establishmentId, tableId)
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(tableId)
    debugger

    return call('GET', `${this.API_URL}/establishment/${establishmentId}/table/${tableId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            debugger
            if(status === 200) {
                const {dishes} = JSON.parse(body)
                return dishes
            }

            const {error} = JSON.parse(body)

            return error
            
        })
}.bind(context)