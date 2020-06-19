const { updateSymptom } = require('server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body: { symptom, id } } = req
        
        updateSymptom( id, symptom )
            .then(id => res.status(200).send({id}))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
