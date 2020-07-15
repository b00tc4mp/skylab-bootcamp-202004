const { confirmUser } = require('aquaponics-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        
        let { payload, params: { userId: otherUserId } } = req, userId;
        if (payload) userId = payload.sub
        
        confirmUser(otherUserId || userId)
            .then(() => res.status(204).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}

