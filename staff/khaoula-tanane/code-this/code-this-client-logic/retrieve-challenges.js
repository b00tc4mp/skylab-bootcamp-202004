// require('code-this-commons/polyfills/string')
const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function() {
    
   return call('GET', `${this.API_URL}/challenges`, undefined, { 'Content-type': 'application/json' })

    .then(({status, body}) => {
        if (status === 200){
            const challenges = JSON.parse(body)
            return challenges
        } else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })

}.bind(context)