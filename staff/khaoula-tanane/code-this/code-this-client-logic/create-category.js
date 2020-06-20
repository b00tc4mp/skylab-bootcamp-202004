const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function (name) {
    const body = JSON.stringify({name}) 
    const headers = { 'Content-type': 'application/json' }
    
    return call(
        'POST',
        `${this.API_URL}/category`, body, headers)

        .then(({ status, body }) => {
            if (status === 201) return
            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)