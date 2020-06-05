require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { call } } = require('misc-commons')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', 'http://localhost:8080/users',
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}