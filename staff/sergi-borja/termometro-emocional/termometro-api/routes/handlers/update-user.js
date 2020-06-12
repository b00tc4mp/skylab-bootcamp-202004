const { updateUser } = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body } = req
    const { payload } = req
    let userId;
    let paramsUserId;
    if (typeof payload !== 'undefined') userId = payload.sub
    else paramsUserId = req.params.userId
    if(body)
    try {
        updateUser(userId || paramsUserId, body)
            .then(() => res.status(204).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}