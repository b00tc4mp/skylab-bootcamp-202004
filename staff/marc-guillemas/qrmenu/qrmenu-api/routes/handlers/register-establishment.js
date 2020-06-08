const { registerEstablishment } = require('qrmenu-server-logic')
const { } = require('../../helpers')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: {name, nif, email, password } } = req

    try {
        registerEstablishment(name, nif, email, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch(error) {
        handleError(error, res)
    }
}