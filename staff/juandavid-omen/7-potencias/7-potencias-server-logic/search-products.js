require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/number')
const { models: { Product } } = require('7-potencias-data')

module.exports = query => {
  String.validate.notVoid(query)

  return Product.find({
    $or: [
      { name: new RegExp(query, 'i') }
    ]
  }).lean()

    .then(products => {
      products = products.map(product => {
        product.id = product._id

        delete product._id
      })

      return products
    })
}
