const {searchWorkGroup} = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
const { query } = require('../../../work-meeting-server-logic/node_modules/work-meeting-data/models/schemas/user')
module.exports = (req, res) => {
    try {
        const { body:{query}} = req

        searchWorkGroup(query)
            .then(workGroups => res.send(workGroups))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}