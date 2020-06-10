const { retrieveMessages } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveMessages(userId)
            .then(messages => res.status(200).json(messages))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}