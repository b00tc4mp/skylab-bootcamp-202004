const { retrieveCohousing } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveCohousing(userId)
            .then(cohousing => res.status(200).json(cohousing))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}