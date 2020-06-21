const { utils: { call } } = require('termometro-commons')
const context = require('./context')

module.exports = function (userId, token) {

    return !token?
    call(
        'DELETE',
        `${this.API_URL}/users/${userId}`,
        undefined,
        undefined
    )
    :
    call(
        'DELETE',
        `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` }

    )
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)