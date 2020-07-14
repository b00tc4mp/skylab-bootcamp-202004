const { retrieveTables } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const {payload: {establishmentId, workerId}} = req

    try {
        retrieveTables(establishmentId, workerId)
            .then(tables => res.send(tables))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}