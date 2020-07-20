const {readByUsers} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const { params: {summaryId }} = req
        readByUsers(summaryId)
            .then(users => res.send(users))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}