const { utils: { call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/number')
const context = require('./context')

module.exports = function(name, width, height) {
    
    const { token } = this.storage

    String.validate.notVoid(token)

    String.validate.notVoid(name)
    Number.validate(width)
    Number.validate(height)

    const data = { name, width, height}


    return call('POST', `${this.API_URL}/blueprint/create`,
            JSON.stringify(data), { 'Content-type': 'application/json', Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 201) {

                const { id } = JSON.parse(body)

                return id

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)