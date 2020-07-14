const { utils: { call } } = require('termometro-commons')
const context = require('./context')

/**
 * Deletes an existing user. If the token is defined, it deletes an admin account, otherwise, deletes a member accound using the id.
 * 
 * @param {string} userId The id of the member.
 * @param {string} token the token.
 * 
 * 
 * @throws {Error} If userId or token are invalid
 */

module.exports = function (userId, token) {

    return !token?
    call(
        'DELETE',
        `${this.API_URL}/users/${userId}`,
        undefined,
        undefined
    )
    .then(({ status, body }) => {
        if (status === 201) return

        const { error } = JSON.parse(body)

        throw new Error(error)
    })
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