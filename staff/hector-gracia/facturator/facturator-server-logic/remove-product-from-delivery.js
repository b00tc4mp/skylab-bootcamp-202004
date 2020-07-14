require("facturator-commons/polyfills/string")
const{models:{Delivery},mongoose:{ObjectId}}= require("facturator-data")
const{errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(deliveryId,productQuantityId)=>{
    String.validate.notVoid(deliveryId)
    String.validate.notVoid(productQuantityId)

    return(async()=>{
        const delivery= await Delivery.findOne({_id:ObjectId(deliveryId)})
        if(!delivery) throw new UnexistenceError(`delivery with id ${deliveryId} does not exist`)
        const index= delivery.products.findIndex((product)=>{return product._id.toString()===productQuantityId})
        if(index<0) throw new UnexistenceError(`entry with id ${productQuantityId} does not exist`)
        delivery.products.splice(index,1)
        await delivery.save()
    })()
}