const jwtPromised = require('../helpers/jwt-promised')

module.exports = (secret, errorHandler) =>
    (req, res, next) => {
        debugger
        try {

            const [, token] = req.header('authorization').split(' ')
            debugger
            jwtPromised.verify(token, secret)
                .then(payload => {
                    req.payload = payload

                    next()
                })
                .catch(error => errorHandler(error, res))
        } catch (error) {
            errorHandler(error, res)
        }
    }