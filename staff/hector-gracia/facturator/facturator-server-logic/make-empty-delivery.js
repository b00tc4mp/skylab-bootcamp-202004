require("facturator-commons/polyfills/string")
const {mongoose:{ObjectId},models:{Client,Delivery}}= require("facturator-data")
const {errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(clientId)=>{
    String.validate.notVoid(clientId)
    return (async()=>{
        const client= await Client.findOne({_id: ObjectId(clientId)})
        if(!client) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        await Delivery.create({client:client._id,products:[],amount:0,paid:false})
    })()
}