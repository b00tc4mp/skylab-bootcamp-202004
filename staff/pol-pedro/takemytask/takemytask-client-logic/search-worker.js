require('takemytask-commons/polyfills/string')
const { utils: { call } } = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api and returns all the workers that match the search
 *
 * @param {boolean} userName if search by username
 * @param {boolean} jobCategory if search by category
 * @param {string} words word to search entered by the user
 * 
 * @returns {object}
 *
 * @throws {Error} if server throws errror
 */

module.exports = function (userName, jobCategory, words) {

    String.validate.notVoid(words)

    return call('POST', `${this.API_URL}/worker/search`,
        `{ "userName": "${userName}", "jobCategory": "${jobCategory}", "words": "${words}" }`,
        {'Content-type': 'application/json'})
            .then(({status, body}) => {
                if (status === 200){

                    return  JSON.parse(body)

                }else {

                    const { error } = JSON.parse(body)
                    throw new Error (error)
                }
            })
    
}.bind(context)