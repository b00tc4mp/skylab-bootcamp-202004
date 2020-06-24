const { registerAdmin } = require('server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body: { username, email, password } } = req
        
        registerAdmin( username, email, password )
            .then(() => res.status(200))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
