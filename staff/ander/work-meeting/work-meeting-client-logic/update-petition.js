require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (userId, workGroupId, petitionId, _status) {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(petitionId)
    String.validate.notVoid(_status)

    return call('PATCH', `${this.API_URL}/petition/update/`,
    `{ "workGroupId": "${workGroupId}", "userId": "${userId}", "petitionId": "${petitionId}", "status": "${_status}" }`,
    { 'Content-type': 'application/json'})
        .then(({ status, body }) => { // cual es la funcion diria de server primero
            if (status === 204) {return 
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)