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
    retrieveLastPh : require('./retrieve-last-ph'),
    isUserSessionValid : require ('./is-usersession-valid'),
    forcastDays: require('./forecast-days'),
    retrieveTemperature:require('./retrieve-temperature'),
    retrievePh:require('./retrieve-ph'),
    retrieveAllUsers:require('./retrieve-all-users'),
    updateUser:require('./update-user')
}