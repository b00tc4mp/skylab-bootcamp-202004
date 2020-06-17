const buildError = require('./error-builder')

module.exports = {
    DuplicityError: buildError('DuplicityError'),
    VoidError: buildError('VoidError'),
    UnexistenceError: buildError('UnexistenceError'), //cuansdo no encuentra el valor
    CredentialsError: buildError('CredentialsError'), //cuando el password esta mal
    ValueError: buildError('ValueError')
}