const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function() {
    
   return call('GET', `${this.API_URL}/categories`, undefined, { 'Content-type': 'application/json' })

    .then(({status, body}) => {
        if (status === 200){
            const categories = JSON.parse(body)
            return categories
        } else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })

}.bind(context)