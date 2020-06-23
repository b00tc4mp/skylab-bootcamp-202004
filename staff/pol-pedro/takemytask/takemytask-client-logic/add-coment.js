require('takemytask-commons/polyfills/string')
const { utils: { call }} = require('takemytask-commons')
const context = require('./context')


module.exports = function (commentedId, comment) {
    String.validate.notVoid(commentedId)
    String.validate.notVoid(comment) 

    const { token } = this.storage

    return call(
    'POST', 
    `${this.API_URL}/comments`, 
    `{"commentedId": "${commentedId}","comment": "${comment}"}`,
        {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}) 
        .then( ({status, body}) => {

            if (status === 201) return 
            
            const { error } = JSON.parse(body)

            throw new Error (error)
        })
}.bind(context)