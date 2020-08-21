const context = require('./context')

module.exports = {
    /* get context () {return context},  */
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createMeeting:require('./create-meeting'),
    createDepartment: require('./create-department'),
    createWorkGroup: require('./create-work-group'),
    searchWorkGroups: require('./search-work-groups'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveWorkGroups:require('./retrieve-work-groups'),
    retrieveDepartments: require('./retrieve-departments'),
    addPetition: require('./add-petition'),
    retrieveWorkGroupPref: require('./retrieve-work-group-pref'),
    changeWorkGroup: require('./change-work-group-pref'),
    retrievePetitionAll: require('./retrieve-all-petitions'),
    updatePetition: require('./update-petition'),
    retrieveReadBy: require('./retrieve-read-by'),
    addReadBy: require('./add-read-by'),
    isUserLoggedIn: require('./is-user-logged-in'),
    isUserSessionValid: require('./is-user-session-valid'),
    logoutUser: require('./logout-user'),
    retrieveSummaries: require('./retrieve-summaries'),
    retrieveSummarys: require('./retrieve-summarys'),
    retrieveWorkGroup: require('./retrieve-work-group'),
    retrieveMeetings: require('./retrieve-meetings'),
    addMemberDepartment: require('./add-member-department'),
    createSummary: require('./create-summary'),
    searchUsers: require('./search-users'),
    addMemberSummary: require('./add-member-summary'),
    addDepartmembersSummary: require('./add-departmembers-summary'),
    retrieveSummaryMembers: require('./retrieve-summary-members')
    
}