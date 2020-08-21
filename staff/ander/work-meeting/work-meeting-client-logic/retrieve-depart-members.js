require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (workGroupId, departmentId) {
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(departmentId)
    debugger
    return call('GET', `${this.API_URL}/departmentMembers/${workGroupId}/${departmentId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {

            if (status === 200) {
                if (!body) return undefined

                else return JSON.parse(body)

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)