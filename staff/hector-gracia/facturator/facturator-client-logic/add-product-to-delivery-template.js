const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')
module.exports=function (templateId,productQuantity){ 
    String.validate.notVoid(templateId)
    if(typeof productQuantity!=="object") throw new TypeError(productQuantity+" is not an object")
    const {productId,quantity}= productQuantity
    String.validate.notVoid(productId)
    if(typeof quantity!=="number") throw new TypeError(quantity+" is not a number")

    return call("POST",`${this.API_URL}/templates/products`,JSON.stringify({templateId,productId,quantity}),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)