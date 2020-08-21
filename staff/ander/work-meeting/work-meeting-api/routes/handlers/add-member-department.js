const { addMemberDepartment } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { workGroupId, departmentId, userId} } = req

    try {
        return addMemberDepartment(userId, workGroupId, departmentId)
                .then(()=> res.status(201).send({message: 'user added in department'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}