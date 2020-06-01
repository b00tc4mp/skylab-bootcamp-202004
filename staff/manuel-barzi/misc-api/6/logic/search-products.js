require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/number')
const { mongo } = require('../data')

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