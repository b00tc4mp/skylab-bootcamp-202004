require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { mongo } = require('misc-data')

module.exports = query => {
    String.validate.notVoid(query)

    return mongo.connect()
        .then(connection => {
            const db = connection.db()

            const products = db.collection('products')

            return products.find({
                $or: [
                    { name: new RegExp(query, 'i') },
                    { description: new RegExp(query, 'i') }
                ]
            }).toArray()
        })
        .then(products => {
            products.forEach(product => {
                product.id = product._id.toString()

                delete product._id
            })

            return products
        })
}