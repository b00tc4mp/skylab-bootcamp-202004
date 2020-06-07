const { model } = require('mongoose')
const { user, food, cohousing, message } = require('./schemas')

module.exports = {
    User: model('User', user ),
    Product: model('Food' , food ),
    Cohousing: model('Cohousing', cohousing ),
    Message: model('Message', message)
}