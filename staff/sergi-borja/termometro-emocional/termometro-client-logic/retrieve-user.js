require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: { call } } = require('termometro-commons')
const context = require('./context')


module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                let _body = JSON.parse(body)
                delete _body.password
                return _body
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)