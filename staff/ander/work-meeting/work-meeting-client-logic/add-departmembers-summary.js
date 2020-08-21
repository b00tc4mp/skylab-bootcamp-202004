
require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (departmentId, summaryId) {
    String.validate.notVoid(departmentId)
    String.validate.notVoid(summaryId)
    
    return call(
        'POST',
        `${this.API_URL}/summary/addDepartment`,
        `{ "departmentId": "${departmentId}", "summaryId": "${summaryId}"}`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            console.log(status, body)
            debugger
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)