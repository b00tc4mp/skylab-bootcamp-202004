require("facturator-commons/polyfills/string")
const{mongoose:{ObjectId},models:{Delivery,Product}}=require("facturator-data")
const{errors:{UnexistenceError}}=require("facturator-commons")
module.exports=(deliveryId,productQuantity)=>{
    String.validate.notVoid(deliveryId)
    if(typeof productQuantity!=="object") throw new TypeError(productQuantity+" is not an object")
    const {product,quantity}= productQuantity
    String.validate.notVoid(product)
    if(typeof quantity!=="number") throw new TypeError(quantity+" is not a number")
    return (async()=>{
        const deliveryDb= await Delivery.findOne({_id:ObjectId(deliveryId)})
        if(!deliveryDb) throw new UnexistenceError(`delivery with id ${deliveryId} does not exist`)
        const productDb= await Product.findOne({_id:ObjectId(product)})
        if(!productDb) throw new UnexistenceError(`product with id ${product} does not exist`)
        deliveryDb.products.push({product,quantity})
        await deliveryDb.save()
    })()
}