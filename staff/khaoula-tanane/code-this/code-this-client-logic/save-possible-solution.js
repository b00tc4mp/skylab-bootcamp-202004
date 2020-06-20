const { utils: { call } } = require('code-this-commons')
const context = require('./context')

module.exports = function (userId, challengeId, solution) {

    const body = JSON.stringify({userId, challengeId, solution}) 
    return call('PATCH', `${this.API_URL}/challenge`, body,
    { 'Content-type': 'application/json' })

    .then(({ status, body }) => {
        console.log(status, body)
        if (status === 200) {
            return JSON.parse(body)
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })
}.bind(context)