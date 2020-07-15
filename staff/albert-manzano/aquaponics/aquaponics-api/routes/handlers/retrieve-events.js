const { retrieveEvents } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports= (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveEvents(userId)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}