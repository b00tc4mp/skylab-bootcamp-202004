const { model } = require('mongoose')
const { user,book,message,following,rating, message,messages } = require('./schemas')

module.exports = {
    User: model('User', user),
    Book: model('Book', book),
    Message: model('Message', message),
    Following: model('Following', following),
    Rating: model('Rating', rating),
    Message: model('Message', message),
    Messages: model('Messages', messages)
}