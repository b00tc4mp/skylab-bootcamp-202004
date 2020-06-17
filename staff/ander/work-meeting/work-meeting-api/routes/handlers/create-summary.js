const { createSummary} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { title, meetingId , content} , payload: {sub: userId}} = req

    try {
        return createSummary(title, meetingId, userId, content)
        .then(()=>{ res.status(201).send()})
        .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
        }
    }
   