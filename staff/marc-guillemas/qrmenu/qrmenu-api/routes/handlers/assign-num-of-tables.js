const {assignNumOfTables} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) => {
    const {body: {tables}, payload: {establishmentId, workerId}} = req
    
    try {
        
        assignNumOfTables(establishmentId,workerId,tables)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}