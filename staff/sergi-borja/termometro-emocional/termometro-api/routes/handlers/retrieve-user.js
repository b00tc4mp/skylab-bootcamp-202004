const { retrieveUser } = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload } = req
        let userId;
        let paramsUserId;
        if (typeof payload !== 'undefined') userId = payload.sub
        else paramsUserId = req.params.userId

        retrieveUser(userId || paramsUserId)
            .then(user => res.send(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}