require('moove-it-commons/polyfills/string')
const { utils: { call } } = require('moove-it-commons')
const context = require('./context')

module.exports = function(token, blueprintId) {
    debugger
    String.validate.notVoid(token)
    String.validate.notVoid(blueprintId)

    return call('GET', `${this.API_URL}/blueprint/${blueprintId}`, undefined, { Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 200) {
                debugger

                const { name, width, height, date, items, _id } = JSON.parse(body)

                const id = _id.toString()

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