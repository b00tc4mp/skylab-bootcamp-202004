const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')

module.exports=function(deliveryId,productQuantityId){
    String.validate.notVoid(deliveryId)
    String.validate.notVoid(productQuantityId)
    return call("DELETE",`${this.API_URL}/deliveries/remove`,JSON.stringify({deliveryId,productQuantityId}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)