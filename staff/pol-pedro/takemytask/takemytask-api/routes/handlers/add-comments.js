const { handleError } = require('../../helpers')
const { addComment } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const {body: {commentedId, comment}} = req
    const { payload: { sub: userId } } = req
    
    try{
        addComment(userId, commentedId, comment)
            .then( () => res.status(201).send())
            .catch( error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
}