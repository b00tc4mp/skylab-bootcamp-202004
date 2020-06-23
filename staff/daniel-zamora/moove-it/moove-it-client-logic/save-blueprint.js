const { utils: { call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/number')
const context = require('./context')

module.exports = function(blueprintId, name, width, height) {
    
    const { token } = this.storage

    String.validate.notVoid(token)
    if (typeof blueprintId !== 'undefined') String.validate.notVoid(blueprintId)
    String.validate.notVoid(name)
    Number.validate(width)
    Number.validate(height)

    const data = { blueprintId, name, width, height }


    return call('POST', `${this.API_URL}/blueprint`,
            JSON.stringify(data), { 'Content-type': 'application/json', Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 201) {
                debugger
                const { id } = JSON.parse(body)

                return (`Blueprint saved with id ${id}`)

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)