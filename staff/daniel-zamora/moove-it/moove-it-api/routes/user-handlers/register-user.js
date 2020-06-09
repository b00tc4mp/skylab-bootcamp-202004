const { register } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => { 

    const { body: { name, surname, email, password, confPassword } } = req

    try {
        registerUser(name, surname, email, password, confPassword)
            .then(()=>res.status(201).send())
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}