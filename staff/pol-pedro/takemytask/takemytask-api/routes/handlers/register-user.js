const { handleError } = require('../../helpers')
const { registerUser } = require('takemytask-server-logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, adress } } = req
    
    try {
        registerUser(name, surname, email, password, adress)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}   