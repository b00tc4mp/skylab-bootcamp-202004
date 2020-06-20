const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function ({initialCode, description, difficulty, tests}) {
    const body = JSON.stringify({initialCode, description, difficulty, tests}) 
    const headers = { 'Content-type': 'application/json' }
    
    return call(
        'POST',
        `${this.API_URL}/challenge`, body, headers)

        .then(({ status, body }) => {
            if (status === 201) return
            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)