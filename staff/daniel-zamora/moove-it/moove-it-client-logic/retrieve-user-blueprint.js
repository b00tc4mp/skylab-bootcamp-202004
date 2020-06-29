require('moove-it-commons/polyfills/string')
const { utils: { call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function() {
    const { token } = this.storage
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/user/blueprints`, undefined, { Authorization: `Bearer ${token}` })

    .then(({ status, body }) => {
        
        if (status === 200) {

           return JSON.parse(body)


          
        } else if (status === 404) {

            throw new Error('You dont have any blueprint yet')

        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })
}.bind(context)