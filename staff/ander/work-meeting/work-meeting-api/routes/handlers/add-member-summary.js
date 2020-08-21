const { addMemberSummary } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { summaryId, userId } } = req

    try {
        return addMemberSummary(userId, summaryId)
            .then(() => res.status(201).send({ message: 'user added in sumamry' }))
            .catch(error => handleError(error, res))
    }

    catch (error) {
        handleError(error, res)
    }
}