const { sendMessage } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { message, date }, payload: {sub: userId} } = req

    try {
        sendMessage(userId, message, date)
            .then(() => res.status(201).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}