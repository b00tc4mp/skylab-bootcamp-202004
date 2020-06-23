require('takemytask-commons/polyfills/string')
const { utils: { call }} = require('takemytask-commons')
const context = require('./context')


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