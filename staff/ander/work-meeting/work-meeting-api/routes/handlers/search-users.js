const { searchUsers } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    try {
        const { params: { workGroupId, query } } = req

        searchUsers(workGroupId, query)
            .then(users => res.send(users))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}