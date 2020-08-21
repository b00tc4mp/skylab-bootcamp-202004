//(userId, workGroupId, departmentId)
require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (userId,workGroupId, departmentId) {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(departmentId)
    debugger
    
    
    return call(
        'POST',
        `${this.API_URL}/department/addMember`,
        `{ "workGroupId": "${workGroupId}", "departmentId": "${departmentId}", "userId": "${userId}"}`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 201) return 

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)