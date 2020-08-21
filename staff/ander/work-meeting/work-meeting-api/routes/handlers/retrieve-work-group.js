const {retrieveWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } } = req
        retrieveWorkGroup(workGroupId)
            .then(workGroup => res.send(workGroup))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}