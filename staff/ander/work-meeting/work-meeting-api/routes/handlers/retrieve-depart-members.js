const {retrieveDepartMembers} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId , departmentId} } = req

        retrieveDepartMembers(workGroupId, departmentId)
            .then(members => res.send(members))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}