const { model } = require('mongoose')
const { user, worker, chat, contract } = require('./schemas')

module.exports = {
    User: model('User', user),
    worker: model('Worker', worker),
    chat: model('Chat', chat),
    idChat: model('ChatId', idChat),
    // contract: model('Contract', contract),
}