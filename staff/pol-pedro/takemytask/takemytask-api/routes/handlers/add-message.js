const { handleError } = require('../../helpers')
const { addMessage } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const {body: {chatId, message}} = req
    const { payload: { sub: userId } } = req
    
    try{
        addMessage(userId, chatId, message)
            .then( () => res.status(201).send())
            .catch( error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
}