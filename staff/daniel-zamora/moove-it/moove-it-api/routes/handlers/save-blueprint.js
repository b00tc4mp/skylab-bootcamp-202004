const { saveBlueprint } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {

    const { body: { userId, blueprintId, name, width, height } } = req

    try {
        saveBlueprint(userId, blueprintId, name, width, height)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}