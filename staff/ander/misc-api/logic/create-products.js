require('../utils/polyfills/string')
require('../utils/polyfills/number')
const { mongo } = require('../data')

module.exports = (name, description, price, url ) => {
    String.validate.notVoid(name)
    String.validate.notVoid(description)
    Number.validate(price)
    String.validate.notVoid(url)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')
            return products.insertOne({ name, description, price, url })
        })
}