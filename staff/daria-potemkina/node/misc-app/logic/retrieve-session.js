const { sessions: { findSession } } = require('../data')
require('../utils/polyfills/string')
require('../utils/polyfills/function')

module.exports = (sessionId, callback) => {
    String.validate.notVoid(sessionId)
    Function.validate(callback)

    findSession({ id: sessionId }, (error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        callback(null, session)
    })
}