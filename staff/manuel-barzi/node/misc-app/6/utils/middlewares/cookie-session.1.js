const { createSession, retrieveSession, updateSession, removeSession } = require('../../logic')

module.exports = (req, res, next) => {
    let { cookies: { sessionId } } = req

    if (!sessionId) {
        createSession((error, id) => {
            if (error) throw error // TODO error handling

            res.cookie('sessionId', id) // set-cookie

            req.session = {
                save(callback) {
                    updateSession(id, this, callback)
                },

                destroy(callback) {
                    res.clearCookie('sessionId')

                    removeSession(id, callback)
                }
            }

            next()
        })
    } else {
        retrieveSession(sessionId, (error, session) => {
            if (error) throw error // TODO error handling

            req.session = session

            session.save = function (callback) {
                updateSession(sessionId, this, callback)
            }

            session.destroy = function (callback) {
                res.clearCookie('sessionId')

                removeSession(sessionId, callback)
            }

            next()
        })
    }
}