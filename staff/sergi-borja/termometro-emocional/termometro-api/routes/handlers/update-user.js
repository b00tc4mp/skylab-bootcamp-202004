const { updateUser } = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }, body: { name, surname, age, sexo, email, password, members } } = req

        updateUser(userId, name, surname, age, sexo, email, password, members)
            .then(user => res.send(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}