const { model } = require('mongoose')
const { user, establishment, dish, order, dishStatus } = require('./schemas')

module.exports = {
    User: model('User', user),
    Establishment: model('Establishment', establishment),
    Dish: model('Dish', dish),
    Order: model('Order', order),
    DishStatus: model('DishStatus', dishStatus)
}