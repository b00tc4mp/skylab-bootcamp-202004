const  {registerUser}  = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { payload, body: { name, surname, age, sex, email, password } } = req

    let userId;

    if(typeof payload !== 'undefined') userId = payload.sub

    try {
        registerUser(name, surname, age, sex, email, password, userId)
            .then(()=> res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}