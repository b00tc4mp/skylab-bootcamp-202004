
module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createMeeting:require('./create-meeting'),
    createWorkGroup: require('./create-work-group'),
    searchWorkGroup: require('./search-work-group'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveWorkGroup:require('./retrieve-work-group'),
    addPetition: require('./add-petition'),
    retrieveWorkGroupPref: require('./retrieve-work-group-pref'),
    changeWorkGroup: require('./change-work-group'),
    retrievePetitionAll: require('./retrieve-petition-all'),
    updatePetition: require('./update-petition'),
    retrieveReadBy: require('./retrieve-read-by'),
    addReadBy: require('./add-read-by')
    
}