require('.../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/number')
const { UnexistenceError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, cart) => {
    String.validate.notVoid(userId)
    
}