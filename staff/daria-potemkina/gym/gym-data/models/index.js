const {model} = require('mongoose')

const {user, future, option, underlying, price, product, optionFeatures, futureFeatures} = require('./schemas')

module.exports = {
    User: model('User', user),
    Future: model ('Future', future),
    Option: model('Option', option),
    Underlying: model('Underlying', underlying),
    Price: model('Price', price),
    Product: model('Product', product),
    OptionFeatures: model('OptionFeatures', optionFeatures),
    futureFeatures: model('FutureFeatures', futureFeatures)
}