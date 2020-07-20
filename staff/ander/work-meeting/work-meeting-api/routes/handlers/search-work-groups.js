const {searchWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    try {
        const {query: {name}} = req
        searchWorkGroup(name)
            .then(workGroups => res.send(workGroups))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}