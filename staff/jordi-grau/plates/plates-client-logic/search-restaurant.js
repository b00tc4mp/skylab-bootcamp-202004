require('plates-commons/polyfills/string')
const { utils: { Email, call }} = require('plates-commons')
const context = require('./context')


module.exports = function(query) {

 
    return call('GET',`${this.API_URL}/search/restaurant?query=${query}`)
        .then(({status, body}) =>{
            if(status === 200) { 
                return JSON.parse(body)
            }else{
                const {error} = JSON.parse(body)
                throw new Error(error)
                }
        })
    
}.bind(context)
