require('plates-commons/polyfills/string')
const {models:{User, Restaurant}} = require('plates-data')
const { utils: { Email, call }} = require('plates-commons')
const bcrypt = require('bcrypt')
const context = require('./context')

module.exports = function(userId) {
    String.validate.notVoid(userId)

    return call(
        'GET',

    )
}
