const { env: { WHITELIST } } = process
const { logTemperature } = require('aquaponics-server-logic')
const handleError = require('../../helpers/handle-error')

module.exports = (req, res) => {
    const { body: { temperature }, params: { arduinoId } } = req

    if (!WHITELIST.includes(arduinoId)) throw handleError(new CredentialsError, res)

    try {
        logTemperature(temperature)
            .then(() =>{debugger
            return res.status(201).send()
            })    
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}