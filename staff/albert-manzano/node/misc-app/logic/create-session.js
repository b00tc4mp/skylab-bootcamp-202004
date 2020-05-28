const { sessions: { create } } = require('../data')
require('../utils/polyfills/function')

module.exports = callback => {
    Function.validate(callback)

    create({ cookiesAccepted: false }, (error, id) => {
        if (error) return callback(error)

        callback(null, id)
    })
}