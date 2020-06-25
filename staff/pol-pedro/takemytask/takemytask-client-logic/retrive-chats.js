require('takemytask-commons/polyfills/string')
const { utils: { call } } = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api and returns all the chat the actual user has
 * 
 * @returns {object}
 *
 * @throws {Error} if server throws errror
 */

module.exports = function () {
    const { token } = context.storage

    return call('GET', `${this.API_URL}/chat/retrive`,
        undefined,
        {'Content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            .then(({status, body}) => {
                if (status === 200){

                    return  JSON.parse(body)

                }else {

                    const { error } = JSON.parse(body)
                    throw new Error (error)
                }
            })
    
}.bind(context)