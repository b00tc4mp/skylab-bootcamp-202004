const {retrieveDepartmentAll} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: { workGroupId } } = req

        retrieveDepartmentAll(workGroupId)
            .then(departments => res.send(departments))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}