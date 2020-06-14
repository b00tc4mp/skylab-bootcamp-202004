require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (ticker) {
    String.validate.notVoid(ticker)
    
    return call('GET', `${this.API_URL}/underlyings/${ticker}`,
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