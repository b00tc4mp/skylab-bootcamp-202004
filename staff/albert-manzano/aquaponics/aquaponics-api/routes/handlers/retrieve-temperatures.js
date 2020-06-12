const { retrieveTemperatures } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveTemperatures(userId)
            .then((allTemperatures) => res.send(allTemperatures))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}