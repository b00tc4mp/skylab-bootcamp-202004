const { model } = require('mongoose')
const { menu, plate, restaurant, user } = require ('./schemas')

module.exports = {
    Menu: model('Menu', menu),
    Plate: model('Plate', plate),
    Restaurant: model('Restaurant', restaurant),
    User: model('User', user)
}
