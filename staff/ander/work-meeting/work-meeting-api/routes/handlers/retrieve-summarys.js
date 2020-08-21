const {retrieveSummarys} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { meetingId } ,payload:{ sub: userId} } = req
        

        retrieveSummarys(userId, meetingId)
            .then(summary => res.send(summary))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}