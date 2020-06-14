const { retrieveWorker } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    const {payload: {establishmentId, workerId}} = req

    try {
        retrieveWorker(establishmentId ,workerId)
            .then(worker => res.send(worker))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}