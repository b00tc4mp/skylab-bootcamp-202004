const {updateEvent} = require('aquaponics-server-logic')
const {handleError} = require ('../../helpers')

module.exports=(req, res) => {
    try {
        const { payload: { sub: userId },body: { newDate,newDescription } } = req

        updateEvent(newDate, newDescription ,userId)
            .then((allEvents) => res.send(allEvents))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}