const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')

module.exports=function(clientId,templateId){
    String.validate.notVoid(clientId)
    String.validate.notVoid(templateId)
    return call("POST",`${this.API_URL}/deliveries/templates`,JSON.stringify({clientId,templateId}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)