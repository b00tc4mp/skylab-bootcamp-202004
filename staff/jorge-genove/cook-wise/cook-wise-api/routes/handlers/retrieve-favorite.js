const { retrieveFavorite } = require('cook-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {debugger
    try {
        const { payload: { sub: userId } } = req
        
        retrieveFavorite(userId)
            .then(recipes => res.send(recipes))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
