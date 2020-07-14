require("facturator-commons/polyfills/string")
const{mongoose:{ObjectId},models:{Product,Template}}= require("facturator-data")
const {errors:{UnexistenceError}}= require("facturator-commons")
module.exports=(templateId,productQuantity)=>{
    String.validate.notVoid(templateId)
    if(typeof productQuantity!=="object") throw new TypeError(productQuantity+" is not an object")
    const {productId,quantity}= productQuantity
    String.validate.notVoid(productId)
    if(typeof quantity!=="number") throw new TypeError(quantity+" is not a number")
    return (async()=>{
        const templateDb= await Template.findOne({_id:ObjectId(templateId)})
        if(!templateDb) throw new UnexistenceError(`template with id ${templateId} does not exist`)
        const productDb= await Product.findOne({_id:ObjectId(productId)})
        if(!productDb) throw new UnexistenceError(`product with id ${productId} does not exist`)
        templateDb.products.push({product:productId,quantity})
        await templateDb.save()
    })()
}