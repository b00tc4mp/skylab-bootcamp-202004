require('gym-commons/polyfills/string')
require('gym-commons/polyfills/function')
const { utils: { call } } = require('gym-commons')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `http://localhost:8080/api/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}