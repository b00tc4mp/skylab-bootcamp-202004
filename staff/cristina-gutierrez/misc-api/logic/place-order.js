require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { UnexistenceError } = require('misc-commons/errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, cart) => {
    String.validate.notVoid(userId)
    
}