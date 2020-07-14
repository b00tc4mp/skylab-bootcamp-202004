const { retrieveEstablishment } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const {payload: {establishmentId}} = req

    try {
        retrieveEstablishment(establishmentId)
            .then(establishment => res.send(establishment))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}