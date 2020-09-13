require('plates-commons/polyfills/string')
const { utils: { call }} = require('plates-commons')
const context = require('./context')

module.exports = function(userId, restaurantId, dishId){
    String.validate.notVoid(userId)
    String.validate.notVoid(restaurantId)
    String.validate.notVoid(dishId)
    const { token } = this.storage

    return( async()=>{
        const response = await call(
            'POST',  `${this.API_URL}/restaurant/menu`,
            `"userId": "${userId}", "restaurantId": "${restaurantId}", "dishId": "${dishId}`,
            {'Content-type': 'application/json', Authorization: `Bearer ${token}`}
        )
    }) ()

}.bind(context)