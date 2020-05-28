const { find, remove }  = require('../../../data')
require('../../../utils/function')
require('../../../utils/string')

module.exports = (sessionId, callback) => {
    String.validate.notVoid(sessionId)
    Function.validate(callback)

    find({ id: sessionId }, 'sessions',(error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        remove(sessionId, 'sessions', error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}