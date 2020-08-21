require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')
module.exports = function (workGroupId, meetingId, title, content) {
    
    String.validate(workGroupId)
    String.validate(meetingId)
    String.validate(title)
    String.validate(content)
    const { token } = context.storage
    String.validate(token)
    

    return call(
        'POST',
        `${this.API_URL}/summary`,
        `{ "workGroupId": "${workGroupId}", "meetingId": "${meetingId}", "title": "${title}", "content": "${content}"}`,
        { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            debugger
            if (status == 201){ return JSON.parse(body)}
            

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)