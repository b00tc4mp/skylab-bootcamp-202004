const {utils:{call}} = require("facturator-commons")
const { utils: { Email }} = require('facturator-commons')
require('facturator-commons/polyfills/string')
const context = require('./context')
module.exports=function (newClient){ 
    if(typeof newClient!=="object") throw new TypeError(newClient+" is not an object")
    const{name, establishment=undefined, contactNumber=undefined, email=undefined, direction=undefined, paymentMethod, paymentInfo=undefined}= newClient

    String.validate.notVoid(name)
    String.validate.notVoid(paymentMethod)
    if(establishment)
        String.validate.notVoid(establishment)
    if(contactNumber)
        if(typeof contactNumber!=="number") throw new TypeError(contactNumber+" is not a number")
    if(email)
        Email.validate(email)
    if(direction)
        String.validate.notVoid(direction)
    if(paymentInfo)
        String.validate.notVoid(paymentInfo)
    return call("POST",`${this.API_URL}/clients`,JSON.stringify(newClient),{ 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if(status ===201) return 
            const {error}= JSON.parse(body)
            throw new Error(error)
        })
}.bind(context)