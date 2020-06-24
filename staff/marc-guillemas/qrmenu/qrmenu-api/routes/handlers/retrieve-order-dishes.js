const { retrieveOrderDishes } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const {payload: {establishmentId, workerId}, body: {dishesIds}} = req
    
    try {
        retrieveOrderDishes(establishmentId, workerId, dishesIds)
            .then(dishes => res.send(dishes))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}