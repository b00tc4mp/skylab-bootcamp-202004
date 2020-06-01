const {mongo} = require("../data")
require('../utils/polyfills/string')

module.exports = (query) => {
    String.validate.notVoid(query)

    let products

   return mongo.connect()
        .then(connection => {debugger
            products =  connection.db().collection('products')

            return products.findOne({name : query})
        })

        .then(product=> {
            if(!product) throw new Error(`product doesn't exist`)

            return product

        })

    }