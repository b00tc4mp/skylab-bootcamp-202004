require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (summaryId, token) {
    debugger
    String.validate(workGroupId)
    String.validate(token)

    return call(
        'POST',
        `${this.API_URL}/readBy`,
        JSON.stringify({summaryId}),
        { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)