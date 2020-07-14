const {addDish} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req,res) => {
    const {body: {name, description, price, tags}, payload: {establishmentId, workerId}} = req
    
    try {
        addDish(establishmentId,workerId,name,description,price,tags)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}