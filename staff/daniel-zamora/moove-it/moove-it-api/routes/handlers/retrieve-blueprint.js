const { retrieveBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger

    const { params: { blueprintId }, payload: { sub: userId } } = req

    try {
        retrieveBlueprint(userId, blueprintId)
            .then(() => res.status(200).send())
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}