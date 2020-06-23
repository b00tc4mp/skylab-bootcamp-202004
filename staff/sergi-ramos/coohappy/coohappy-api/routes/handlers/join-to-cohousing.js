const { joinToCohousing } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {

    const { payload: { sub: userId } } = req
    const { body: { accessCode } } = req

    console.log(userId)
    try {
        joinToCohousing(userId, accessCode)
            .then(() => res.status(201).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}