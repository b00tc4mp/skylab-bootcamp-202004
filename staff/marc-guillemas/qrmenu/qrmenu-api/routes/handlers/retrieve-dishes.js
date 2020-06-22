const {retrieveDishes} = require('qrmenu-server-logic')
const {handleError} = require('../../helpers')

module.exports = (req, res) => {

    const {params: {establishmentId, tableId}} = req

    try {
        retrieveDishes(establishmentId, tableId)
        .then(dishes => res.send({dishes}))
        .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)        
    }
}