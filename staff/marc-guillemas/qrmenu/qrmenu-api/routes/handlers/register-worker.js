const {env: { SECRET }} = process
const {handleError} = require('../../helpers')
const {utils: {jwtPromised}} = require('qrmenu-commons')
const { registerWorker } = require('qrmenu-server-logic')

module.exports = (req, res) => {
    const {body: {name, surname, role, password}, payload: {sub: establishmentId}} = req
    
    try {
        registerWorker(establishmentId, name, surname, role, password)
            .then(userId => jwtPromised.sign({sub: userId}, SECRET, {expiresIn: '1d'}))
            .then(token => res.send({token}))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error,res)
    }
}