const { retrieveAllUsers } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveAllUsers(userId)
            .then(allUsers => res.send(allUsers))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}