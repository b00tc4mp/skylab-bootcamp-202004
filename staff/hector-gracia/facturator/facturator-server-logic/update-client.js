require('facturator-commons/polyfills/string')
const { utils: { Email }} = require('facturator-commons')
const { mongoose:{ObjectId},models: { Client } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

module.exports=(clientId,updatedClient)=>{
    if(typeof updatedClient!=="object") throw new TypeError(updatedClient+" is not an object")
    const{name, establishment, contactNumber, email, direction, paymentMethod, paymentInfo}= updatedClient
    String.validate.notVoid(clientId)
    if(name)
        String.validate.notVoid(name)
    if(paymentMethod)
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

    return(async ()=>{
        oldClient= await Client.findOne({ _id:ObjectId(clientId)})
        if(!oldClient) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        await Client.updateOne({_id:ObjectId(clientId)},updatedClient)
        return undefined
    })()

}