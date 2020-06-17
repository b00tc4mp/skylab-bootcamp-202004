const {retrieveWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }} = req

        retrieveWorkGroup(userId)
            .then(workGroups => res.send(workGroups))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}