const unRegisterUser = require('termometro-server-logic/un-register-user');

module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    unRegisterUser: require('./un-register-user')
}