require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { mongo } = require('misc-data')
const {model :{Product}}  = require('misc-data')

module.exports = query => {
    String.validate.notVoid(query)

    return Product.find({
        $or: [
            { name: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
        ]
    }).lean()
        .then(products => {
            products = products.map(product => {
                product.id = product._id
                delete product._id
                delete product.__v
                return product
            })
            return products
        })
} 
