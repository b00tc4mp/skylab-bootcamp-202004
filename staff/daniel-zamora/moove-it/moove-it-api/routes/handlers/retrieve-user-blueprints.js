const { retrieveUserBlueprints } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    

    const { payload: { sub: userId } } = req

    try {
        retrieveUserBlueprints(userId)
            .then(blueprints => res.status(200).send(blueprints))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}