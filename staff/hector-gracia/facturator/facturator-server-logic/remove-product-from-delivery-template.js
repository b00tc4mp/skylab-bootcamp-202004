require("facturator-commons/polyfills/string")
const{models:{Template},mongoose:{ObjectId}}= require("facturator-data")
const{errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(templateId,productQuantityId)=>{
    String.validate.notVoid(templateId)
    String.validate.notVoid(productQuantityId)

    return(async()=>{
        const template= await Template.findOne({_id:ObjectId(templateId)})
        if(!template) throw new UnexistenceError(`template with id ${templateId} does not exist`)
        const index= template.products.findIndex((product)=>{return product._id.toString()===productQuantityId})
        if(index<0) throw new UnexistenceError(`entry with id ${productQuantityId} does not exist`)
        template.products.splice(index,1)
        await template.save()
    })()
}