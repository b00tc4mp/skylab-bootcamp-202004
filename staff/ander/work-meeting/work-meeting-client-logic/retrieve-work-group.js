require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (workGroupId) {
    String.validate.notVoid(workGroupId)

    return call('GET', `${this.API_URL}/workGroup/${workGroupId}`,
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