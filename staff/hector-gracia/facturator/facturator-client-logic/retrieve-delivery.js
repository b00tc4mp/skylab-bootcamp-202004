const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')

module.exports=function(deliveryId){
    String.validate.notVoid(deliveryId)
    return call("GET",`${this.API_URL}/deliveries/id/${deliveryId}`,undefined,{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===200) return JSON.parse(body)
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)