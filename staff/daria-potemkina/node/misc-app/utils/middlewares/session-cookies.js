const { createSession, retrieveSession, updateSession, removeSession } = require('../../logic')

module.exports = (req, res, next) => {
    let { cookie: { sessionId } } = req

    if (!sessionId) {
        createSession((error, id) => {
            if (error) throw error

            res.cookie('sessionId', id)

            req.session = {
                save(callback) {
                    const session = { ...this }

                    delete session.__res__

                    updateSession(id, session, callback)
                },

                destroy(callback) {
                    this.__res__clearCookie('sessionId')

                    removeSession(id, callback)

                }
            }

            req.session.__res__ = res

            next()
        })
    } else {
        retrieveSession(sessionId, (error, session) => {
            if (error) throw error

            req.session = session

            session.save = function (callback) {
                const session = { ...this }

                delete session.__res__

                updateSession(sessionId, session, callback)
            }

            session.destroy = function (callback) {
                this.__res__.clearCookie('sessionId')

                removeSession(sessionId, callback)
            }

            session.__res__ = res

            next()
        })
    }
}