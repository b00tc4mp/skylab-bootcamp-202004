const { model } = require('mongoose')
const { user,book, message} = require('./shemas')

module.exports = {
    User: model('User', user),
    Book: model('Book', book),
    Message: model('Message', message),
}