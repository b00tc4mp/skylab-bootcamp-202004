require('takemytask-commons/polyfills/string')
const { utils: { call }} = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api and add a rate given by the users to a specific worker id
 *
 * @param {string} ratedId workers unique id
 * @param {string} stars number of puntuation given by users 
 * 
 * @returns {undefined}
 *
 * @throws {Error} if server throws errror
 */


module.exports = function (ratedId, stars) {
    String.validate.notVoid(ratedId)
    Number.validate.integer(stars) 

    const { token } = this.storage

    return call(
    'POST', 
    `${this.API_URL}/rates`, 
    `{"ratedId": "${ratedId}", "stars": ${stars}}`,
        {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}) 
        .then( ({status, body}) => {

            if (status === 201) return 
            
            const { error } = JSON.parse(body)

            throw new Error (error)
        })
}.bind(context)