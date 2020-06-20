const  {registerUser}  = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { payload, body: { name, surname, age, sex, location, email, password, mood } } = req

    let userId;

    if(typeof payload !== 'undefined') userId = payload.sub

    try {
        registerUser(userId, name, surname, age, sex, location, email, password, mood)
            .then(()=> res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}