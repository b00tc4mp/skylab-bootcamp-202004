const { registerCohousing } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { name, address, laundryNum }, payload: {sub: userId} } = req

    try {
        registerCohousing(name, address ,laundryNum, userId)
            .then(() => res.status(201).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}