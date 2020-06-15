const { handleError } = require('../../helpers')
const { addRating } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const {body: {ratedId, stars}} = req
    const { payload: { sub: userId } } = req
    
    try{
        addRating(userId, ratedId, stars)
            .then( () => res.status(201).send())
            .catch( error => handleError(error, res))
    }catch(error){
        handleError(error, res)
    }
}