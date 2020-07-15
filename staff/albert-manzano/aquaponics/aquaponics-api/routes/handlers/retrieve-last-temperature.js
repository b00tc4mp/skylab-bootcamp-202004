const { retrieveLastTemperature } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {

    try {
        const { payload: { sub: userId } } = req

        retrieveLastTemperature(userId)
            .then((lastTemperature) => res.send(lastTemperature))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}