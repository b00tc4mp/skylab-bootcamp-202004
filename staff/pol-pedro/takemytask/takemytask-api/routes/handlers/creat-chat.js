const { handleError } = require('../../helpers')
const { creatChat } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const {body: {destinatorId, message}} = req
    const { payload: { sub: userId } } = req
    
    try{
        creatChat(userId, destinatorId, message)
            .then( () => res.status(201).send())
            .catch( error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
}