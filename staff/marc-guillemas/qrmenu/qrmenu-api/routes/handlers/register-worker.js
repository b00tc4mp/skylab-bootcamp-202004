const {env: { SECRET }} = process
const {handleError} = require('../../helpers')
const {utils: {jwtPromised}} = require('qrmenu-commons')
const { registerWorker } = require('qrmenu-server-logic')

module.exports = (req, res) => {
    
    const {body: {email, role, password}, payload: {establishmentId, workerId}} = req
    
    try {
        registerWorker(establishmentId, workerId, email, role, password)
            .then(() => res.send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error,res)
    }
}