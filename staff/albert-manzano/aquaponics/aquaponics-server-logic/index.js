module.exports = {
    //users

    authenticateUser: require('./authenticate-user'),
    confirmUser:require('./confirm-user'),
    registerUser: require('./register-user'), 
    retrieveUser: require('./retrieve-user'),  
    retrieveAllUsers:require('./retrieve-all-users'), 
    revokeUnrevokeUser:require('./revoke-unrevoke-user'),
    unregisterUser:require('./unregister-user'),
    updateUser:require('./update-user'),
    //searchUser
        
    //arduino

    logPh:require('./log-ph'),
    logTemperature:require('./log-temperature'),
    retrieveTemperatures:require('./retrieve-temperatures'),
    retrievePhs:require('./retrieve-phs'),
    retrieveLastTemperature:require('./retrieve-last-temperature'),
    retrieveLastPh:require('./retrieve-last-ph'),

    //event

    createEvent:require('./create-event'),
    updateEvent:require('./update-event'),
    removeEvent:require('./remove-event'),
    retrieveEvents:require('./retrieve-events'),
}