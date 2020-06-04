const { model } = require('mongoose')

module.exports = {
    User: model('User', require('./user')),
    Product: model('Product', require('./product'))
}