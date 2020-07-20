require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (title,content, userId) {
    String.validate.notVoid(title)
    String.validate.notVoid(content)
    String.validate.notVoid(userId)

    return call(
        'POST',
        `${this.API_URL}/meeting`,
        `{ "title": "${title}", "content": "${content}", "userId": "${userId}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)