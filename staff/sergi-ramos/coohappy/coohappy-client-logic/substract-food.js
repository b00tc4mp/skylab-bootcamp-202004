require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')

/**
 * Substract food from food list.
 * 
 * @param {string} foodItem Food name. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = function(foodItem) {
   
    String.validate.notVoid(foodItem)    

    return (async () => {

        const token = await this.storage.getItem('TOKEN')

        const response = await call(
            'PATCH',
            `${this.API_URL}/users/food/substract`,
            JSON.stringify({foodItem}),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const { status } = response;
        if (status === 204) return
        
        const { error } = JSON.parse(response.body)

        throw new Error(error)
    })()
}.bind(context)