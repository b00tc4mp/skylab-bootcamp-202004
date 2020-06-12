const { revokeUnrevokeUser } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }, params: { userId: otherUserId } } = req

        revokeUnrevokeUser(otherUserId || userId)
            .then(() => res.status(204).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}