const {retrieveDepartments} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } , payload:{sub: userId}} = req

        retrieveDepartments(userId, workGroupId)
            .then(departments => res.send(departments))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}