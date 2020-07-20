const { retrieveUser } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }, params: { userId: otherUserId } } = req

        retrieveUser(otherUserId || userId)
            .then(user => res.status(200).send(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}