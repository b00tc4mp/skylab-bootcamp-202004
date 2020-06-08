const { model } = require('mongoose')
const { user, event, ph, temperature } = require('./schemas')

module.exports = {
    User: model('User', user),
    Event: model('Event', event),
    PH: model('Ph', ph),
    Temperature: model('Temperature', temperature)
}