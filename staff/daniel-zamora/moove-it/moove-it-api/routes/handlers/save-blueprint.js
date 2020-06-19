const { saveBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {

    const { body: { blueprintId, name, width, height }, payload: { sub: userId } } = req

    try {
        saveBlueprint(userId, blueprintId, name, width, height)
            .then(id => res.status(201).json({ id }))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}