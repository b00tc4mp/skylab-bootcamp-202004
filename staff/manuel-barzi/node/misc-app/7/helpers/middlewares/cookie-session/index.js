const createSession = require('./create-session')
const retrieveSession = require('./retrieve-session')
const updateSession = require('./update-session')
const removeSession = require('./remove-session')

module.exports = (req, res, next) => {
    let { cookies: { sessionId } } = req

    if (!sessionId) {
        createSession((error, sessionId) => {
            if (error) throw error // TODO error handling

            res.cookie('sessionId', sessionId) // set-cookie

            retrieveSession(sessionId, (error, session) => {
                if (error) throw error // TODO error handling

                mountMethodsOnSession(session, sessionId, res)

                req.session = session

                next()
            })
        })
    } else {
        retrieveSession(sessionId, (error, session) => {
            if (error) throw error // TODO error handling

            mountMethodsOnSession(session, sessionId, res)

            req.session = session

            next()
        })
    }
}

function mountMethodsOnSession(session, sessionId, res) {
    session.save = function (callback) {
        updateSession(sessionId, this, callback)
    }

    session.destroy = function (callback) {
        res.clearCookie('sessionId')

        removeSession(sessionId, callback)
    }
}