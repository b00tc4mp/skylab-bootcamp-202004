const {toggleTableOrder} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) => {
    const {body: {tableId}, payload: {establishmentId, workerId}} = req
    debugger
    try {
        debugger
        toggleTableOrder(establishmentId,workerId,tableId)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}