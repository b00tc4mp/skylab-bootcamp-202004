/**
 * Deletes chalenges.
 * 
 * @param {string} id - id of the challenge that admin wants to delete.
 *
 */
const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function(id) {
    
   return call('DELETE', `${this.API_URL}/deletecategory/${id}`, undefined, { 'Content-type': 'application/json' })

    .then(({status, body}) => {
        if (status === 200){
            return
        } else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })

}.bind(context)