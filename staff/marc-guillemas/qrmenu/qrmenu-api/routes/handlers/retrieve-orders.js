const { retrieveOrders } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const {payload: {establishmentId, workerId}} = req

    try {
        retrieveOrders(establishmentId, workerId)
            .then(orders => res.send(orders))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}