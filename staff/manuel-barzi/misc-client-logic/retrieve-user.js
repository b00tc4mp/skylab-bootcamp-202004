const { utils: { call } } = require('misc-commons')
const context = require('./context')

module.exports = function () {
    const { token } = this.storage

    return call('GET', `${this.API_URL}/users`,
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
}.bind(context)