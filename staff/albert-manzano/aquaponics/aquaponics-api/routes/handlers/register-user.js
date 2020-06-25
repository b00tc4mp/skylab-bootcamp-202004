const { registerUser } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { name, surname, email, password,role, phone } } = req
    
    try {
        registerUser(name, surname, email, password,role, phone)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}