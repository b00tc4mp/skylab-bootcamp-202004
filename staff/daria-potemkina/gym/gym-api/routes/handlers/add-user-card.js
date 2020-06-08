const { addUserCard } = require('gym-server-logic')
const { handleError } = require('../../helpers')


module.exports = (req, res) => {
    let { body: { number, holder, expirationDate, cvv }, payload: {sub: userId} } = req

    expirationDate = new Date(expirationDate)

    try{
        addUserCard(userId, number, holder, expirationDate, cvv)
        .then(() => res.status(201).send())
        .catch(error => handleError(error, res)) 
    }catch(error){
        handleError(error, res)
    }
}