const { registerSymptomList } = require('server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body } = req
        debugger
        registerSymptomList( body )
            .then(symptomList => res.status(200).send(symptomList))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
