const { retrieveUser } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }, params: { userId: otherUserId } } = req

        retrieveUser(otherUserId || userId)
            .then(user => res.status(200).json(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}