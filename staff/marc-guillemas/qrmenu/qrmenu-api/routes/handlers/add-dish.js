const {addDish} = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')
//TODO
module.exports = (req,res) => {
    const {body: {name, description, price, tags}, payload: {establishmentId, workerId}} = req
    debugger
    try {
        addDish(establishmentId,workerId,name,description,price,tags)
            .then(() => res.send())
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}