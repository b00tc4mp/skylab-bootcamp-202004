const {toggleTableOrder} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) => {
    const {body: {tableId}, payload: {establishmentId, workerId}} = req
    
    try {
        
        toggleTableOrder(establishmentId,workerId,tableId)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}