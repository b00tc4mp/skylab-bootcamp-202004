require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (summaryId) {
    String.validate.notVoid(summaryId)

    return call('GET', `${this.API_URL}/readBy/${summaryId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)