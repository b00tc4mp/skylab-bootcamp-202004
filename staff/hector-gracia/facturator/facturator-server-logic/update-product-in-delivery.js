require("facturator-commons/polyfills/string")
const{mongoose:{ObjectId},models:{Delivery,Product}}= require("facturator-data")
const{errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(deliveryId,productQuantityId,productQuantity)=>{//TODO make it so if given only product or quantity still works
    String.validate.notVoid(deliveryId)
    String.validate.notVoid(productQuantityId)
    if(typeof productQuantity!=="object") throw new TypeError(productQuantity+" is not an object")
    const{product,quantity}= productQuantity
    String.validate(product)
    if(typeof quantity!=="number") throw new TypeError(quantity+" is not a number")
    return (async()=>{
        const delivery= await Delivery.findOne({_id:ObjectId(deliveryId)})
        if(!delivery) throw new UnexistenceError(`delivery with id ${deliveryId} does not exist`)
        const index= delivery.products.findIndex((product)=>{return product._id.toString()===productQuantityId})
        if(index<0) throw new UnexistenceError(`entry with id ${productQuantityId} does not exist`)
        const productDb=await Product.findOne({_id:ObjectId(product)})
        if(!productDb) throw new UnexistenceError(`product with id ${product} does not exist`)
        delivery.products[index].product=product
        delivery.products[index].quantity=quantity
        await delivery.save()
    })()
}