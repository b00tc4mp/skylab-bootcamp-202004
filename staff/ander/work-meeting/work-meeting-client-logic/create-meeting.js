require('work-meeting-commons/polyfills/string')
const { utils: { Email, call } } = require('work-meeting-commons')
const context = require('./context')
module.exports = function (workGroupId,title,content) {
    String.validate.notVoid(title)
    String.validate.notVoid(content)
    String.validate.notVoid(workGroupId)
    const { token } = context.storage
    
    String.validate.notVoid(token)

    return call(
        'POST',
        `${this.API_URL}/meeting`,
        `{ "workGroupId": "${workGroupId}","title": "${title}", "content": "${content}" }`,
        { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)