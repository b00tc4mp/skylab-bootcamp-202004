const { model } = require('mongoose')
const { user, worker, chat, contract, idChat, rates, coments } = require('./schemas')

module.exports = {
    User: model('User', user),
    Worker: model('Worker', worker),
    Chat: model('Chat', chat),
    Rates: model('Rates', rates),
    Comments: model('Comments', coments)

    // contract: model('Contract', contract),
}