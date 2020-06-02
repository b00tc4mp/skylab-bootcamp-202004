require('misc-commons/polyfills/string')
const { mongo } = require('../data')


module.exports = (query) => {

    String.validate.notVoid(query)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')

            return products.find({ pName : query })
        })
        .then(listProducts => {
           return listProducts = listProducts.toArray()
        })
}