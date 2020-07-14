const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')
module.exports=function (name){ 
    String.validate.notVoid(name)

    return call("POST",`${this.API_URL}/templates`,JSON.stringify({name}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)