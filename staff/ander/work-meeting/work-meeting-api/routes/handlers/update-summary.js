const { updateSummary } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { summaryId , title, content, participants} } = req
    try {
        return updateSummary(summaryId, title, content, participants)
                .then(()=> res.status(204).send({message: 'summary updated'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}