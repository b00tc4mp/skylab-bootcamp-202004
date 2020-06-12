const { removeEvent } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports=(req, res) => {
    try {
        const { payload: { sub: userId },params:{eventId} } = req

        removeEvent(userId,eventId)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}