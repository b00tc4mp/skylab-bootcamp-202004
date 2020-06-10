const { model } = require('mongoose')
const { staff, establishment, dish, order, dishStatus } = require('./schemas')

module.exports = {
    Staff: model('Staff', staff),
    Establishment: model('Establishment', establishment),
    Dish: model('Dish', dish),
    Order: model('Order', order),
    DishStatus: model('DishStatus', dishStatus)
}