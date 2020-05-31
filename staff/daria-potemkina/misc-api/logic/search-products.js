require('../utils/polyfills/string')
const { mongo } = require('../data')

module.exports = query => {
    String.validate.notVoid(query)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')

            return products.find({ $or: [{ name: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }] })
        })

        .then(products => {
            return products.toArray()
        })
}
