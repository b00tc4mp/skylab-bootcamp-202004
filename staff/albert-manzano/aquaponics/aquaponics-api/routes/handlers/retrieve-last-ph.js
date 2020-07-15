const { retrieveLastPh } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveLastPh(userId)
            .then((lastPh) => res.send(lastPh))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}