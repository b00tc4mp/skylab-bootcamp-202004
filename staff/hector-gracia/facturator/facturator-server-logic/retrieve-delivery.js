require("facturator-commons/polyfills/string")
const{models:{Delivery},mongoose:{ObjectId}}= require("facturator-data")
const{errors:{UnexistenceError}}=require("facturator-commons")
module.exports=(deliveryId)=>{//TODO get the date of the delivery
    String.validate.notVoid(deliveryId)
    return(async()=>{
        const delivery= await Delivery.findOne({_id: ObjectId(deliveryId)},{__v:0}).populate({
            path:"products",
            populate:{
                path:"product",
                model:"Product"
            }
        }).populate({path:"client"}).lean()
        if(!delivery) throw new UnexistenceError(`delivery with id ${deliveryId} does not exist`)
        //Sanitize
        const result=sanitize(delivery)
        return  result
        
    })()
}
const sanitize=(delivery)=>{
    console.log(delivery)
    const result={}
    result.id= delivery._id.toString()
    result.client=delivery.client
    result.client.id=result.client._id.toString()
    delete result.client._id
    delete result.client.__v
    result.products= []
    for(let i=0;i<delivery.products.length;i++){
        let productQuantity={}
        productQuantity.id=delivery.products[i]._id.toString()
        productQuantity.quantity= delivery.products[i].quantity
        let product={}
        product.id=delivery.products[i].product._id.toString()
        product.name=delivery.products[i].product.name
        product.price=delivery.products[i].product.price//TODO Test should expect price and description
        product.description= delivery.products[i].product.description
        productQuantity.product=product
        result.products.push(productQuantity)
    }
    return result
}