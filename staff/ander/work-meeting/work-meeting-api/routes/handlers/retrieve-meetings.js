const { handleError } = require('../../helpers')
const {retrieveMeetings} = require('work-meeting-server-logic')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } ,payload:{ sub: userId} } = req

        retrieveMeetings(userId, workGroupId )
            .then(meetings=> res.send(meetings))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}