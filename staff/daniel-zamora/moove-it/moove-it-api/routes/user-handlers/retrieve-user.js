const { retrieveUser } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => { 
    try{
        const { params: { userId }, payload: {sub: id} } = req
        
        retrieveUser(userId || id)
            .then(user=> res.status(200).send(user))
            .catch(error => handleError(error, res)) 

    }catch(error){
        handleError(error, res)
    }
}