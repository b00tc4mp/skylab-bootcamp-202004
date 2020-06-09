require('facturator-commons/polyfills/string')
const { mongoose:{ObjectId},models: { Client,Product } } = require('facturator-data')
const { errors:{UnexistenceError}} = require('facturator-commons')
const {round}= Math//TODO utils para redondear a dos decimales

module.exports=(clientId)=>{
    String.validate.notVoid(clientId)
    
    
    return (async () => {
        const client= await Client.findOne({_id: ObjectId(clientId)},{__v:0}).populate({
            path:"discounts",
            populate:{
                path:"product",
                model:"Product"
            }
        }).lean()
        if(!client) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        const results=[]
        client.discounts.forEach(currentDiscount => {
            const aux={}
            aux.name= currentDiscount.product.name
            aux.description= currentDiscount.product.description
            aux.basePrice= round(currentDiscount.product.price*100)/100
            aux.discount= currentDiscount.discount
            aux.finalPrice= aux.basePrice-(aux.discount*aux.basePrice*0.01)
            aux.finalPrice= round(aux.finalPrice*100)/100
            aux.productId= currentDiscount.product._id.toString()
            results.push(aux)
        });
        return results
    })()

}