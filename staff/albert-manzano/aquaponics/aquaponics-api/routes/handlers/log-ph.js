const { env: { WHITELIST } } = process

const { logPh } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { ph }, params: { arduinoId } } = req

    if (!WHITELIST.includes(arduinoId)) throw handleError(new CredentialsError, res)

    try {
        logPh(ph)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}