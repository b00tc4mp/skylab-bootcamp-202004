const { model } = require('mongoose')
const { user, order, product, productQuantity } = require('./schemas')

module.exports = {
    User: model('User', user),
    Product: model('Product', product),
    Order: model('Order', order),
    ProductQuantity: model('ProductQuantity', productQuantity)
}