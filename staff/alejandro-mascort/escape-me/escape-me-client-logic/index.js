module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    // isUserAuthenticated: require('./is-user-authenticated'),
    retrieveUser: require('./retrieve-user'),
    toggleEscapeRoom: require('./toggle-escape-room'),
    toggleFollowUser: require('./toggle-follow-user')
}