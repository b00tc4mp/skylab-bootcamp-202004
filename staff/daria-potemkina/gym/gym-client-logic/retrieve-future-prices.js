require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (futureId) {
    debugger
    String.validate.notVoid(futureId)
    
    return call('GET', `${this.API_URL}/price?productId=${futureId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                let results = JSON.parse(body)

                return results.sort((a, b) => {
                    a.date = a.date.split('T')[0];
                    b.date = b.date.split('T')[0];
                    
                    return (new Date(a.date) - new Date(b.date))
                })

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)