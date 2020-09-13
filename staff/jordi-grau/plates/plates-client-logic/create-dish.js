require('plates-commons/polyfills/string')
require('plates-commons/polyfills/number')
const { utils: { call }} = require('plates-commons')
const context = require('./context')

module.exports = function (restaurantId, name, position, tags, price){
    String.validate.notVoid(restaurantId)
    String.validate.notVoid(name)
    String.validate.notVoid(position)
    Number.validate(price)
    const { token }  = this.storage
    
    return (async() =>{
        debugger
        const response = await call(
            'POST',
            `${this.API_URL}/restaurant/dishes`, 
            `{ "restaurantId": "${restaurantId}", "name": "${name}", "position": "${position}", "tags": "${tags}", "price": "${price}" }`,
            {'Content-type': 'application/json', Authorization: `Bearer ${token}`} 
        )
        const { body, status } = response
             
            if(status === 201) return
         
            const { error } = JSON.parse(body)
    
            throw new Error(error)
    }) ()
    
}.bind(context)