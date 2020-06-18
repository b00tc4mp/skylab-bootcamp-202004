require('moove-it-commons/polyfills/string')
const { utils: { call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function(token) {
    debugger
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`, undefined, { Authorization: `Bearer ${token}` })

    .then(({ status, body }) => {
        if (status === 200) {
            debugger
            const { name, surname, email } = JSON.parse(body)

            return { name, surname, email }
        } else if (status === 404) {
            throw new Error('User not found')
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })
}.bind(context)