const { recipeIdeas } = require('cook-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {debugger
    try {
        const { body : ingredients, payload: { sub: userId } } = req
        
        recipeIdeas(userId, ingredients)
            .then(result => res.send(result))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
