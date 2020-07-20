const {searchUsers} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const {query, params: {workGroupId}} = req

        searchUsers(query, workGroupId)
            .then(users => res.send(users))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}