const { createMeeting} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { title, content } , payload: {sub: userId}} = req

    try {
        return createMeeting(title, userId, content)
        .then(()=>{ res.status(201).send()})
        .catch(error => handleError(error, res))
        } catch (error) {
            handleError(error, res)
        }
    }
   