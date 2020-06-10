require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `http://localhost:8080/api/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}