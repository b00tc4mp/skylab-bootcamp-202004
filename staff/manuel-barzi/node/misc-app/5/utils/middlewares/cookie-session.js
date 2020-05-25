const { uid } = require('..')

const sessions = {}

module.exports = (req, res, next) => {
    let { cookies: { sessionId } } = req, session

    if (!sessionId) {
        sessionId = uid()

        session = sessions[sessionId] = { 
            cookiesAccepted: false,

            destroy() {
                delete sessions[sessionId]

                //res.clearCookie('sessionId') // WARN! this won't work because this is a closure! => debug and RTFM!
                this.__res__.clearCookie('sessionId')
            }
        }

        res.cookie('sessionId', sessionId)
    } else {
        session = sessions[sessionId]
    }

    session.__res__ = res

    req.session = session

    next()
}