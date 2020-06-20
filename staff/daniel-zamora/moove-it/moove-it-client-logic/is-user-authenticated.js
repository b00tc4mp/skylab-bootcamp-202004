require('misc-commons/polyfills/string')
const { utils: { call } } = require('misc-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`, undefined, { Authorization: `Bearer ${token}`})
        .then(({status}) => status === 200)
}.bind(context)