const { retrieveEstablishment } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    const {payload: {sub: userId}} = req

    try {
        retrieveEstablishment(userId)
            .then(user => res.send(user))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}