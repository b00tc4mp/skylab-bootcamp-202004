require('facturator-commons/polyfills/string')
const { errors:{UnexistenceError}} = require('facturator-commons')
const { mongoose:{ObjectId},models: { Delivery,Client,Product } } = require('facturator-data')

module.exports = (newDelivery) => {
    if(typeof newDelivery!== "object") throw new TypeError(newDelivery+=" is not an object")
    const{client,products,amount,date,paid}= newDelivery
    String.validate.notVoid(client)
    if(typeof amount!== "number") throw new TypeError(amount+" is not a number")
    if(typeof paid!=="boolean") throw new TypeError(paid+" is not a boolean")
    //TODO validate date
    return (async () => {
        const clientdb=await Client.findOne({_id:ObjectId(client)})
        if(!clientdb) throw new UnexistenceError(`client with id ${client} does not exist`)
        products.forEach(current => {
            if(typeof current.quantity!=="number") throw new TypeError(current.quantity+" is not a number")
            const product=await Product.findOne({_id:ObjectId(current.product)})
            if(!product) throw new UnexistenceError(`product with id ${current.product} does not exist`)
        })
        await Delivery.create({client:ObjectId(client),products,amount,date,paid})
    })()
}