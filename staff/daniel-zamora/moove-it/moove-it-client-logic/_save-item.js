const { utils: { call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/number')
const context = require('./context')


module.exports = function(itemId, token, blueprintId, name, x, y, z, orientation, width, height) {
    if (typeof itemId !== 'undefined') String.validate.notVoid(itemId)
    String.validate.notVoid(token)
    String.validate.notVoid(blueprintId)
    String.validate.notVoid(name)
    Number.validate(x)
    Number.validate(y)
    Number.validate(z)
    Number.validate(orientation)
    Number.validate(width)
    Number.validate(height)


    return call('POST', `${this.API_URL}/blueprint`,
            `{"itemId": "${itemId}" "blueprintId": "${blueprintId}", "name": "${name}", "x": "${x}","y": "${y}","z": "${z}","width": "${width}", "height": "${height}"}`, { 'Content-type': 'application/json', Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 201) return ('Saved')

            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)