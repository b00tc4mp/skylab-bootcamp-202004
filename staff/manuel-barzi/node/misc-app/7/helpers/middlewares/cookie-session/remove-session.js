const { sessions: { find, remove } } = require('../../../data')
require('../../../utils/polyfills/function')
require('../../../utils/polyfills/string')

module.exports = (sessionId, callback) => {
    String.validate(sessionId)
    Function.validate(callback)

    find({ id: sessionId }, (error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        remove(sessionId, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}