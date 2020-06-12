const { utils: {call} } = require('termometro-commons')
const context = require('./context')

module.exports = function(name, surname, age, sex, email, memberId) {
    return call('PATCH',
        `${this.API_URL}/users/${memberId}`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}","email": "${email}"}`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 201) return

            // const { error } = JSON.parse(body)

            // throw new Error(error)
        })
}.bind(context)