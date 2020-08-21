require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (workGroupId) {
    String.validate.notVoid(workGroupId)
    const {token} = context.storage
    String.validate.notVoid(token)
   

    return call('PATCH', `${this.API_URL}/workGroupPref`,
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