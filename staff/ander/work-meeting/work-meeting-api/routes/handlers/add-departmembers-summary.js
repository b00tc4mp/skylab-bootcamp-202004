const { addDepartMembersSummary } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { summaryId, departmentId} } = req

    try {
        return addDepartMembersSummary(departmentId,summaryId )
                .then(()=> res.status(201).send({message: 'user added in department'}))
                .catch(error=> handleError(error, res))
            }

    catch (error) {
        handleError(error, res)
    }
}