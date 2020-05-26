const { create } = require('../../../data')
require('../../../utils/function')

module.exports = callback => {
    Function.validate(callback)

    create({cookiesAccepted: false}, 'sessions', (error, id) => {
        if (error) return callback(error)

        callback(null, id)
    })
}