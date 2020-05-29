const { sessions: { findSession, updateSession } } = require('../data')
require('../utils/polyfills/string')
require('../utils/polyfills/function')

module.exports = (sessionId, data, callback) => {
    String.validate.notVoid(sessionId)
    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)
    Function.validate(callback)

    findSession({ id: sessionId }, (error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        for (let key in data) {
            session[key] = data[key]
        }

        updateSession(sessionId, session, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}