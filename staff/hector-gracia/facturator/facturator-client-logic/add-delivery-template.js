const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')
module.exports=function (template){ 
    if(typeof template!== "object") throw new TypeError(template+=" is not an object")
    const{name,products}= template
    String.validate.notVoid(name)
    if(!Array.isArray(products)) throw new TypeError(products+" is not an array")

    return call("POST",`${this.API_URL}/templates`,JSON.stringify({name,products}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)