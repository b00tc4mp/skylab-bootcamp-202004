require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')
debugger
module.exports = function (token, workGroupId) {
    String.validate.notVoid(token)
    String.validate.notVoid(workGroupId)

    return call('PATCH', `${this.API_URL}/workgroup/change`,
    `{ "workGroupId": "${workGroupId}" }`,
    { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 204) {return 
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)