const { createDepartment} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { workGroupId, name } , payload: {sub: userId}} = req

    try {
        return createDepartment(workGroupId, userId, name)
        .then(()=>{ res.status(201).send()})
        .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
        }
    }
   