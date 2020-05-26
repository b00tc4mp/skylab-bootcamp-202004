module.exports = {
    register: require('./register'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createSession: require('./create-session'),
    updateSession: require('./update-session'),
    retrieveSession: require('./retrieve-session'),
    removeSession: require('./remove-session')
}