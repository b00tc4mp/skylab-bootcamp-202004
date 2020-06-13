const { closeUserPosition } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { payload: { sub: userId } } = req

    try {
        closeUserPosition(userId)
            .then(() => res.status(200).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}