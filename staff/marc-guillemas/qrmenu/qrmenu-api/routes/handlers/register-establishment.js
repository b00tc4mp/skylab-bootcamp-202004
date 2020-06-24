const { registerEstablishment } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: {establishment, nif, email, password } } = req
    
    try {
        registerEstablishment(establishment, nif, email, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch(error) {
        handleError(error, res)
    }
}