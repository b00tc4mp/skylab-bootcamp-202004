require("facturator-commons/polyfills/string")
const {mongoose:{ObjectId},models:{Client,Template,Delivery}}=require("facturator-data")
const {errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(clientId,templateId)=>{
    String.validate.notVoid(clientId)
    String.validate.notVoid(templateId)
    return(async()=>{
        const client= await Client.findOne({_id:ObjectId(clientId)})
        if(!client) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        const template= await Template.findOne({_id:ObjectId(templateId)})
        if(!template) throw new UnexistenceError(`template with id ${templateId} does not exist`)
        await Delivery.create({client:client._id,products:template.products,amount:0,paid:false})
    })()
}