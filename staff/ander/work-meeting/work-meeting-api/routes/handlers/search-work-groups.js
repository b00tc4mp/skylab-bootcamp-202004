const { searchWorkGroups } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { query: { name }, payload: { sub: userId } } = req
        searchWorkGroups(userId, name)
            .then(workGroups => res.send(workGroups))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}