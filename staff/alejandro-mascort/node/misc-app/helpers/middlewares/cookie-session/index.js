const createSession = require('./create-session') 
const retrieveSession = require('./retrieve-session')
const updateSession = require('./update-session')
const removeSession = require('./remove-session')

module.exports = (req, res, next) => {
    let { cookies : { sessionId } } = req

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
                    res.clearCookie('sessionId')

                    removeSession(id, callback)
                }
            }

            next()
        })
    } else {
        retrieveSession(sessionId, (error, session) => {
            if (error) throw error

            req.session = session
            
            session.save = function(callback) {
                const session = { ...this }
                debugger
                delete session.__res__

                updateSession(sessionId, session, callback)
            }

            session.destroy = function(callback) {
                res.clearCookie('sessionId')

                removeSession(sessionId, callback)
            }

            next()
        })
    }
}