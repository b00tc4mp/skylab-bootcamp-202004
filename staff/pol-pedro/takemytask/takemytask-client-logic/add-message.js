require('takemytask-commons/polyfills/string')
const { utils: { call }} = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api to add a messge to the specific chat id
 *
 * @param {string} chatId chat unique id
 * @param {string} comment users message
 * 
 * @returns {undefined}
 *
 * @throws {Error} if server throws errror
 */


module.exports = function (chatId, message) {
    String.validate.notVoid(chatId)
    String.validate.notVoid(message) 

    const { token } = this.storage

    return call(
    'POST', 
    `${this.API_URL}/chat/message`, 
    `{"chatId": "${chatId}", "message": "${message}"}`,
        {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}) 
        .then( ({status, body}) => {

            if (status === 201) return 
            
            const { error } = JSON.parse(body)

            throw new Error (error)
        })
}.bind(context)