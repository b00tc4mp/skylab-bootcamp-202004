const { mongo } = require('../data')

module.exports = (product) => {

    if(!product instanceof Object ) throw new TypeError(`${product} is not an object`)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')

            return products.insertOne( product )
        })
} 