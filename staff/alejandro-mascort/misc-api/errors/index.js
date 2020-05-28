const buildError = require('./build-error')

module.exports = {
    DuplicityError: buildError('DuplicityError'),
    VoidError: buildError('VoidError'),
    UnexistenceError: buildError('UnexistenceError'),
    CredentialsError: buildError('CredentialsError')
}