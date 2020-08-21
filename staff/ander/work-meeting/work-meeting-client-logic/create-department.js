require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')
module.exports = function (workGroupId, name) {
    String.validate.notVoid(name)
    String.validate.notVoid(workGroupId)
    
    const { token } = context.storage
    String.validate.notVoid(token)
    debugger

    return call(
        'POST',
        `${this.API_URL}/department`,
        `{ "workGroupId": "${workGroupId}", "name": "${name}" }`,
        { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)