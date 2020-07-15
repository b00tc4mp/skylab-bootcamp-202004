const { model } = require('mongoose')
const {  dish, restaurant, user } = require ('./schemas')

module.exports = {
    Dish: model('Dish', dish),
    Restaurant: model('Restaurant', restaurant),
    User: model('User', user)
}
