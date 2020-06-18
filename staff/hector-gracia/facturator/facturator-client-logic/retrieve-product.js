const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')

module.exports=function(productId){
    String.validate.notVoid(productId)
    return call("GET",`${this.API_URL}/products/${productId}`,undefined,{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===200) return JSON.parse(body)
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)