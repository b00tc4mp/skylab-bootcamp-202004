require('moove-it-commons/polyfills/string')
const { utils: { call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function () {
    const { token } = this.storage
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`, undefined, { Authorization: `Bearer ${token}`})
        .then(({status}) => status === 200)
}.bind(context)