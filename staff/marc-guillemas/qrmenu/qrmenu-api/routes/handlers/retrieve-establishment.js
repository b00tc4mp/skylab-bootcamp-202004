const { retrieveEstablishment } = require('qrmenu-server-logic')
const { handleError } = require('../../helpers')
module.exports = (req, res) => {
    const {payload: {sub: workerId}} = req

    try {
        retrieveEstablishment(workerId)
            .then(user => res.send(user))
            .catch(error => handleError(error,res))
    } catch (error) {
        handleError(error,res)
    }
}