const context = require('./context')

module.exports = {
    get __context__() { return context },
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    loginUser:require('./login-user'),
    isUserLoggedIn:require('./is-user-logged-in'),
    forecast:require('./forecast'),
    logout:require('./logout'),
    retrieveLastTemperature : require('./retrieve-last-temperature'),
    isUserSessionValid : require ('./is-usersession-valid'),
    forcast3Days: require('./forecast-3days')
}