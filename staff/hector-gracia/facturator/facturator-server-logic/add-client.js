require('facturator-commons/polyfills/string')
const { utils: { Email }} = require('facturator-commons')
const { models: { Client } } = require('facturator-data')

module.exports = (newClient) => {
    if(typeof newClient!== "object") throw new TypeError(newClient+=" is not an object")
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

    return (async () => {
        await Client.create({ name, establishment, contactNumber, email, direction, paymentMethod, paymentInfo})
    })()
}