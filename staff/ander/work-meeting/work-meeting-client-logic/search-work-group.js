require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')
debugger
module.exports = function (query) {
    String.validate.notVoid(query)

    return call('GET', `${this.API_URL}/workgroup/search?name=${query}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            debugger
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)