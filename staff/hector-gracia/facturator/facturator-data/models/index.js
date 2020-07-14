const { model } = require('mongoose')
const { client,product,discount,productQuantity,delivery,template} = require('./schemas')
module.exports = {
    Client: model('Client', client),
    Product: model("Product",product),
    ProductQuantity:model("ProductQuantity",productQuantity),
    Discount: model("Discount",discount),
    Delivery:model("Delivery",delivery),
    Template:model("Template",template)
}