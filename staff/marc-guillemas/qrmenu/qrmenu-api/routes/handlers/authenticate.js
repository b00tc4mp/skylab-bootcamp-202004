const {env: { SECRET }} = process
const {handleError} = require('../../helpers')
const {utils: {jwtPromised}} = require('qrmenu-commons')
const { authenticate } = require('qrmenu-server-logic')

module.exports = (req, res) => {
    const {body: {nif, email, password}} = req
    
    try {
        
        authenticate(nif,email,password)
            .then(({establishmentId, workerId}) => jwtPromised.sign({establishmentId, workerId}, SECRET, {expiresIn: '1d'}))
            .then(token => res.send({token}))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error,res)
    }
}