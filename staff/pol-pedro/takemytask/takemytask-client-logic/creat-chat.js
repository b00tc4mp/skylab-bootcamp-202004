require('takemytask-commons/polyfills/string')
const { utils: { call }} = require('takemytask-commons')
const context = require('./context')


module.exports = function (destinatorId) {
    String.validate.notVoid(destinatorId) 

    const { token } = this.storage

    return call(
    'POST', 
    `${this.API_URL}/chat/create`, 
    `{"destinatorId": "${destinatorId}"}`,
        {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}) 
        .then( ({status, body}) => {

            
            if (status === 201) {
                const { id } = JSON.parse(body)

                return id
            }
            
            
            const { error } = JSON.parse(body)

            throw new Error (error)
        })
}.bind(context)