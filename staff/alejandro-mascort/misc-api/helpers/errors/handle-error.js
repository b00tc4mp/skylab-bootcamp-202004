const { DuplicityError, VoidError, UnexistenceError, CredentialsError } = require('../../errors')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt


function handleError(error, res) {
    let status = 500

    switch(true) {
        case error instanceof DuplicityError || error instanceof UnexistenceError:
            status = 409
            break
        case error instanceof TypeError || error instanceof VoidError:
            status = 406
            break
        case error instanceof CredentialsError || error instanceof JsonWebTokenError:
            status = 401
            break
    }

    res.status(status).json({ error: error.message }) 
}

module.exports = handleError