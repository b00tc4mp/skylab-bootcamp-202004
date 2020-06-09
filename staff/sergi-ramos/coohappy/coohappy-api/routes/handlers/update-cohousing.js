const { updateCohousing } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body, payload: { sub: userId } } = req

        updateCohousing(userId, body)
            .then(() => res.status(204).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}