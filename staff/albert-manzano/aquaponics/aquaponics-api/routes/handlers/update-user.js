const { updateUser } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req
        const { body: { name, surname, email, password, phone, role, status, confirmed } } = req
        const userUpdate = { name, surname, email, password, phone, role, status, confirmed }

        updateUser(userId, userUpdate)
            .then(() => res.status(204).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}