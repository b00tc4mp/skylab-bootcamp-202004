const { handleError } = require('../../helpers')
const { retriveUser } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const { payload: { sub: userId } } = req
    
    try {
        retriveUser(userId)
            .then((user) => res.send(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
} 