const {addDishesToOrder} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) => {
    const {body: {dishes}, params: {establishmentId, tableId}} = req
    debugger
    try {
        debugger
        addDishesToOrder(establishmentId,tableId,dishes)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}