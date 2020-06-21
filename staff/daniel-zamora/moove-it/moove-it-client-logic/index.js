module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    context: require('./context'),
    retrieveUserBlueprints: require('./retrieve-user-blueprint'),
    saveBlueprint: require('./save-blueprint'),
    retrieveBlueprint: require('./retrieve-blueprint'), 
    isSessionValid: require('./is-session-valid'), 
    isSessionActive: require('./is-session-active'),
    logoutUser: require('./logout-user')
}