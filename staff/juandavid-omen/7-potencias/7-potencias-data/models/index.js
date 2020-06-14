const { model } = require('mongoose')
const { user, product, productQuantity, order } = require('./schemas')

module.exports = {
  User: model('User', user),
  Product: model('Product', product),
  ProductQuantity: model('ProductQuantity', productQuantity),
  Order: model('Order', order)
}
