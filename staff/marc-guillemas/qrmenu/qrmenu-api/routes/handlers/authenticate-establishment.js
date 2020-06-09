const {env: { SECRET }} = process
const {handleError} = require('../../helpers')
const {utils: {jwtPromised}} = require('qrmenu-commons')
const { authenticateEstablishment } = require('qrmenu-server-logic')

module.exports = (req, res) => {
    const {body: {email, password}} = req
    
    try {
        authenticateEstablishment(email,password)
            .then(userId => jwtPromised.sign({sub: userId}, SECRET, {expiresIn: '1d'}))
            .then(token => res.send({token}))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error,res)
    }
}