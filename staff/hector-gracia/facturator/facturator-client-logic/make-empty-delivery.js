const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')

module.exports=function(clientId){
    String.validate.notVoid(clientId)
    return call("POST",`${this.API_URL}/deliveries`,JSON.stringify({clientId}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)