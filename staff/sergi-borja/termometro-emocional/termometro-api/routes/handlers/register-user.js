const  {registerUser}  = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { name, surname, age, sexo, email, password } } = req

    try {
        registerUser(name, surname, age, sexo, email, password)
            .then(()=> res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}