const { handleError } = require('../../helpers')
const { updateUser } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const { payload: { sub: userId } } = req
    const { body } = req
    
    try {
        updateUser(userId, body)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
} 