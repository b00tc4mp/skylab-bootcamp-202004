require('../../misc-commons/polyfills/string')
const { mongo } = require('../data')
const { DuplicityError } = require('../../misc-commons/errors')

module.exports = (name, description, price, url) => {
    debugger
    String.validate.notVoid(name)
    String.validate.notVoid(description)
    // if (isNaN(price)) throw new TypeError(wrong ${price} input)
    String.validate.notVoid(url)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')

            return products.findOne({ name })
                .then(product => {
                    if (product) throw  new DuplicityError(`Product with that ${name} already exist`)

                    return products.insertOne({ name, description, price, url })
                })
        })

}