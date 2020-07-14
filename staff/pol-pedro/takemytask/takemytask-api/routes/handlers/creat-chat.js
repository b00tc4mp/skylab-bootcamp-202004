const { handleError } = require('../../helpers')
const { creatChat } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const {body: {destinatorId}} = req
    const { payload: { sub: userId } } = req
    
    try{
        creatChat(userId, destinatorId)
            .then( (id) => res.status(201).send({id}))
            .catch( error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
}