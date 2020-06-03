
const{errors:{CredentialsError,UnexistenceError,DuplicityError,VoidError}}= require("misc-commons")
const { JsonWebTokenError } = require('../middlewares')


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
        case (error.message === "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"):
            status = 409
            error.message = "these are not the files you are looking for ;)"
            break
    }

    res.status(status).json({ error: error.message })
}