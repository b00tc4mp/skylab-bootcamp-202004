require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (name, userId) {
    String.validate(name)
    String.validate(userId)


    return call(
        'POST',
        `${this.API_URL}/workgroup`,
        `{ "name": "${name}", "userId": "${userId}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return

            debugger

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)