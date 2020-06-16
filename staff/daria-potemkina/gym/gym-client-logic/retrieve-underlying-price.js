require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function (ticker) {
    String.validate.notVoid(ticker)

    return call('GET', `${this.API_URL}/underlyings/${ticker}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                const results = JSON.parse(body)

                return results.sort((a, b) => {
                    a.date = moment(a.date.split('T')[0]).format('DD-MMMM-YY');
                    b.date = moment(b.date.split('T')[0]).format('DD-MMMM-YY');
                
                    return (new Date(a.date) - new Date(b.date))
                })
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)