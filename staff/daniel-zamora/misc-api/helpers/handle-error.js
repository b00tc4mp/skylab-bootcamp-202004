const { errors: { UnexistenceError, CredentialsError, ForbiddenError, VoidError, DuplicityError, JsonWebTokenError }} = require('misc-commons')

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
        case error instanceof ForbiddenError:
            status = 403
            break
    }

    res.status(status).json({ error: error.message })
}