const { model } = require('mongoose')
const { user, worker, chat, contract, idChat } = require('./schemas')

module.exports = {
    User: model('User', user),
    Worker: model('Worker', worker),
    Chat: model('Chat', chat),
    IdChat: model('IdChat', idChat),
    // contract: model('Contract', contract),
}