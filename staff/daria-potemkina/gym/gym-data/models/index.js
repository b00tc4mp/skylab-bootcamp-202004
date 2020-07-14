const { model } = require('mongoose')

const { user, option, underlying, price, product, contract, trade, accountBalance } = require('./schemas')

module.exports = {
    User: model('User', user),
    Option: model('Option', option),
    Underlying: model('Underlying', underlying),
    Price: model('Price', price),
    Product: model('Product', product),
    Contract: model('Contract', contract),
    Trade: model('Trade', trade),
    AccountBalance: model('accountBalance', accountBalance)
}