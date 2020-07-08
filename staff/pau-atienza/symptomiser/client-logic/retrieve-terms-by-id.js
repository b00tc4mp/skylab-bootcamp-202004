/**
 * Retrieves a symptom from the HPO database uploaded to the database using the HPO_id. I also retrieves all symptoms above and below it in the relational database.
 * 
 * @param {string} HPO_id the id of the symptom in the HPO database
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

require('commons/polyfills/string')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = function (HPO_id) {
    String.validate.notVoid(HPO_id)

    return (async ()=>{
        const {status, body} = await call('GET', `${this.API_URL}/terms/${HPO_id}`, undefined, undefined)
        if(status === 409) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()
}.bind(context)