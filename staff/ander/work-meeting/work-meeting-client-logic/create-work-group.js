require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')
module.exports = function (name) {
    const { token } = context.storage
    String.validate(name)
    String.validate(token)


    return call(
        'POST',
        `${this.API_URL}/workgroup`,
        `{ "name": "${name}"}`,
        { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)