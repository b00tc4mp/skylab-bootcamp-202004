require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')
const { env: { MONGODB_URL } } = process


module.exports = query => {
    String.validate.notVoid(query)

    return mongo.connect(MONGODB_URL)
        .then(connection => {
            const products = connection.db().collection('products')

            return products.find({ $or: [{ name: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }] }).toArray()
        })

        .then(products => {
            products.forEach(product => {
                delete product._id
            })
            return products
        })
}
