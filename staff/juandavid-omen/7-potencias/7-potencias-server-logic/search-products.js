require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/number')
const { models: { Product } } = require('7-potencias-data')

module.exports = query => {
  String.validate.notVoid(query)

  return (async () => {
    let products = await Product.find({
       $or: [ { name: new RegExp(query, 'i') } ] 
    }).lean()
    
    products = products.map(product => {
      product.id = product._id.toString()
      delete product._id
      delete product.__v
       
      return product
    })

    return products
  })()
}
