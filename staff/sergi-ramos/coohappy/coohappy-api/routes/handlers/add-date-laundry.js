const { addDateLaundry } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { day, hour}, payload: {sub: userId} } = req

    try {
        addDateLaundry(day, hour, userId)
            .then(() => res.status(201).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}