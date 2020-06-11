const { utils: {call} } = require('termometro-commons')
const context = require('./context')

module.exports = function(token, name, surname, age, sex, email) {
    return call('PATCH',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}","email": "${email}"}`,
        { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return

            // const { error } = JSON.parse(body)

            // throw new Error(error)
        })
}.bind(context)