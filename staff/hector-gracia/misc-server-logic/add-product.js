require('../utils/polyfills/string')
const{mongo}= require("../misc-api/data")
module.exports=(product)=>{ //{name,description,price,url}
    const{name,description,price,url}=product
    String.validate.notVoid(product.name)
    String.validate.notVoid(product.description)
    if(Number.isNaN(product.price)) throw new TypeError(`${product.price} is not a number`)
    String.validate.notVoid(product.url)

    
    return mongo.connect()
        .then(connection=>{
            const products=connection.db().collection("products")
            return products.insertOne({name,description,price,url})
        })
}