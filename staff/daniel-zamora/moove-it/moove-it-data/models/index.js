const { model } = require('mongoose')
const { user, blueprint, item } = require('./schemas')

module.exports = {
    User: model('User', user),
    Item: model('Item', item),
    Blueprint: model('Blueprint', blueprint)
}