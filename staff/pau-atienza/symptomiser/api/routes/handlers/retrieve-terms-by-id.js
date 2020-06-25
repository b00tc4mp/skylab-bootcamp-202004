const { retrieveTermsById } = require('../../../server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { params: { id } } = req

        retrieveTermsById( id )
            .then(result => res.status(200).send(result))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
