const { retrievePhs } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrievePhs(userId)
            .then((allPhs) => res.send(allPhs))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}