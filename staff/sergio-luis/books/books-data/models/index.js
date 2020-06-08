const { model } = require('mongoose')
const { user,book,following,rating, message} = require('./shemas')

module.exports = {
    User: model('User', user),
    Book: model('Book', book),
    Message: model('Message', message),
    Following: model('Following', following),
    Rating: model('Rating', rating)
}