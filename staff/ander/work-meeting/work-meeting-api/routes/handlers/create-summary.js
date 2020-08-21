const { createSummary } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { title, workGroupId ,meetingId, content }, payload: { sub: userId } } = req

    try {
        return createSummary(userId, workGroupId,meetingId, title, content)
            .then(summary =>  res.status(201).send(summary))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
