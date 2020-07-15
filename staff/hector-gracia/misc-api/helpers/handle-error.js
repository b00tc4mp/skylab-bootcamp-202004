const { DuplicityError, VoidError, UnexistenceError, CredentialsError } = require('misc-commons/errors')
const { JsonWebTokenError } = require('jsonwebtoken')

module.exports = function (error, res) {
    let status = 500

    switch (true) {
        case error instanceof TypeError || error instanceof VoidError:
            status = 406
            break
        case error instanceof DuplicityError || error instanceof UnexistenceError:
            status = 409
            break
        case error instanceof CredentialsError || error instanceof JsonWebTokenError:
            status = 401
            break
    }
    console.log(error)
    res.status(status).json({ error: error.message })
}