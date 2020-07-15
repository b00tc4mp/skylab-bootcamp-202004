const { sessions: { find } } = require('misc-data')
require('../utils/polyfills/function')
require('misc-commons/polyfills/string')

module.exports = (sessionId, callback) => {
    String.validate(sessionId)
    Function.validate(callback)

    find({ id: sessionId }, (error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        callback(null, session)
    })
}