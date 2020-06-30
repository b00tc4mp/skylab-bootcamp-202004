const { createWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { name } , payload: {sub: userId}} = req

    try {
        return createWorkGroup(name, userId)
        .then(()=>{ res.status(201).send()})
        .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
        }
    }
   