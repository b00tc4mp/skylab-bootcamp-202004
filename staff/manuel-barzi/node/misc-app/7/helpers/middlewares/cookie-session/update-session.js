const { sessions: { find, update } } = require('../../../data')
require('../../../utils/polyfills/function')
require('../../../utils/polyfills/string')

module.exports = (sessionId, data, callback) => {
    String.validate(sessionId)
    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)
    Function.validate(callback)

    find({ id: sessionId }, (error, sessions) => {
        if (error) return callback(error)

        const [session] = sessions

        if (!session) throw new Error(`no session ${sessionId}`)

        for (let key in data) session[key] = data[key]

        update(sessionId, session, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}