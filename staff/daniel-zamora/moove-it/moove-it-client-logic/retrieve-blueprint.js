require('moove-it-commons/polyfills/string')
const { utils: { call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function(blueprintId) {
    
    const { token } = this.storage

    String.validate.notVoid(token)
    String.validate.notVoid(blueprintId)

    return call('GET', `${this.API_URL}/blueprint/${blueprintId}`, undefined, { Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {
            
            if (status === 200) {
                

                const { name, width, height, date, items, id } = JSON.parse(body)

                

                const blueprint = { id, name, width, height, date, items }

                return blueprint

            } else if (status === 404) {

                throw new Error('You dont have any blueprint yet')

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)