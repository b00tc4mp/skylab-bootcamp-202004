require('facturator-commons/polyfills/string')
const { mongoose:{ObjectId},models: { Client,Product } } = require('facturator-data')
const { errors:{UnexistenceError}} = require('facturator-commons')

module.exports = (clientId,newDiscount) => {
    String.validate.notVoid(clientId)
    if(typeof newDiscount!== "object") throw new TypeError(newDiscount+=" is not an object")
    const {product, discount}= newDiscount
    String.validate.notVoid(product)
    if(typeof discount!=="number") throw new TypeError(discount+" is not a number")
    return (async () => {
        const clientDb= await Client.findOne({_id: ObjectId(clientId)})
        if(!clientDb) throw new UnexistenceError(`client with id ${clientId} does not exist`)
        const productDb= await Product.findOne({_id:ObjectId(product)})
        if(!productDb) throw new UnexistenceError(`product with id ${product} does not exist`)
        clientDb.discounts.push({product,discount})
        await clientDb.save()
    })()
}