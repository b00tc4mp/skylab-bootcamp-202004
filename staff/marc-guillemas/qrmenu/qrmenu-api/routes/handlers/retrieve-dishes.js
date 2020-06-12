const {retrieveDishes} = require('qrmenu-server-logic')
const {handleError} = require('../../helpers')

module.exports = (req, res) => {

    const {payload: {establishmentId}} = req

    try {
        retrieveDishes(establishmentId)
        .then(dishes => res.send({dishes}))
        .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)        
    }
}