const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { body: { departmentId} } = req

    try {
        registerUser(departmentId)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}