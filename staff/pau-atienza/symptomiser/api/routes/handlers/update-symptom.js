const { updateSymptom } = require('server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body: { id, modifiers, comments } } = req
        debugger
        updateSymptom( id, modifiers, comments )
            .then(id => res.status(200).send({id}))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
