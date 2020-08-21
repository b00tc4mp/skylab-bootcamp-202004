const {addReadBy } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    const { body: { summaryId }, payload: { sub: userId } } = req
    try {
        addReadBy(userId, summaryId)
            .then(() => res.status(201).send({ message: 'user has read summary' }))
            .catch(error => handleError(error, res))
    }

    catch (error) {
        handleError(error, res)
    }
}