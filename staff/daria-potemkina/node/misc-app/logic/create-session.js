const {sessions: {createSession} } = require('../data')
require('../utils/polyfills/function')

module.exports = callback =>{
    Function.validate(callback)

    createSession({ cookiesAccepted: false}, (error, id) =>{
        if(error) return callback(error)

        callback(null, id)
    })
}