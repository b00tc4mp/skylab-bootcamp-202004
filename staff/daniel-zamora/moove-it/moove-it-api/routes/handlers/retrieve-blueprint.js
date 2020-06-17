const { retrieveBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger

    const { payload: { sub: userId }, params: { blueprintId } } = req

    try {
        retrieveBlueprint(userId, blueprintId)
            .then((blueprint) => res.status(200).send(blueprint))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}