const context = require('./context')

module.exports = {
    get __context__() { return context },
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    // isUserAuthenticated: require('./is-user-authenticated'),
    retrieveUser: require('./retrieve-user'),
    loginUser:require('./login-user'),
    isUserLoggedIn:require('./is-user-logged-in'),
    forecast:require('./forecast')
}