const { saveBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    
    const { body: { blueprintId, items }, payload: { sub: userId } } = req

    try {
        saveBlueprint(userId, blueprintId, items)
            .then(id => res.status(201).json({ id }))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}