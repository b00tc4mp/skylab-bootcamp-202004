const { createEvent } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports=(req, res) => {
    try {
        const { payload: { sub: userId },body: {date,description } } = req

        createEvent(date, description,userId)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}