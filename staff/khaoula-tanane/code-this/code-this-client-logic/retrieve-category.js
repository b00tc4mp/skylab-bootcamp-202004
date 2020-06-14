const context = require('./context')
const { utils: { call } } = require('code-this-commons')


module.exports = function(name) {
    
   return call('GET', `${this.API_URL}/category/${name}`, undefined, { 'Content-type': 'application/json' })

    .then(({status, body}) => {
        if (status === 200){
            const category = JSON.parse(body)
            return category
        } else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })

}.bind(context)