require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (futureId) {
    String.validate.notVoid(futureId)
    
    return call('GET', `${this.API_URL}/price?productId=${futureId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                const results = JSON.parse(body)

                results.sort((a, b) => {
                    return (a.date - b.date)
                })
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)