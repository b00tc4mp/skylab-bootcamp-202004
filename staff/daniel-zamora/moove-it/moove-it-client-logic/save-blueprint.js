const { utils: { call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
const context = require('./context')


module.exports = function(token, blueprintId, name, width, height) {
    String.validate.notVoid(token)
    if (typeof blueprintId !== 'undefined') String.validate.notVoid(blueprintId)
    String.validate.notVoid(name)
    Number.validate(width)
    Number.validate(height)


    return call('POST', `${this.API_URL}/blueprint`,
            `{"blueprintId": "${blueprintId}", "name": "${name}", "width": "${width}", "height": "${height}"}`, { 'Content-type': 'application/json', Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 201) return ('Saved')

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)