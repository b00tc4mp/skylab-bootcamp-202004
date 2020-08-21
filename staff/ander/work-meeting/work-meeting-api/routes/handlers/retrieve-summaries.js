const {retrieveSummaries} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } ,payload:{ sub: userId} } = req
        

        retrieveSummaries(userId, workGroupId )
            .then(summaries => res.send(summaries))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}