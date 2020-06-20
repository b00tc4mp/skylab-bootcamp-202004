module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    context: require('./context'),
    retrieveUserBlueprints: require('./retrieve-user-blueprint'),
    saveBlueprint: require('./save-blueprint'),
    retrieveBlueprint: require('./retrieve-blueprint'), 
    isUserAuthenticated: require('./is-user-authenticated')
}