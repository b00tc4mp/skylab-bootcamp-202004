const { createBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    const { body: { name, width, height }, payload: { sub: userId } } = req

    try {
        createBlueprint(userId, name, width, height)
            .then(id => res.status(201).json({ id }))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}