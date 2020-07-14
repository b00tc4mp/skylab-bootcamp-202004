const {utils:{call}} = require("facturator-commons")
require('facturator-commons/polyfills/string')
const context = require('./context')
module.exports=function (newProduct){ 
    if(typeof newProduct!== "object") throw new TypeError(newProduct+=" is not an object")
    const{name,description,price,tax,alergens}= newProduct

    String.validate.notVoid(name)
    if(typeof price!== "number") throw new TypeError(price+" is not a number")
    if(description)
        String.validate.notVoid(description)
    if(tax)
        if(typeof tax!=="number") throw new TypeError(tax+" is not a number")
    if(alergens)
        alergens.forEach(alergen => {
            String.validate(alergen)
        })
    return call("POST",`${this.API_URL}/products`,JSON.stringify(newProduct),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)