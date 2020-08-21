require('work-meeting-commons/polyfills/string')
const { utils: { call } } = require('work-meeting-commons')
const context = require('./context')

module.exports = function (userId, summaryId) {
    String.validate.notVoid(userId)
    String.validate.notVoid(summaryId)
    
    return call(
        'POST',
        `${this.API_URL}/summary/addMember/`,
        `{ "summaryId": "${summaryId}", "userId": "${userId}"}`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)