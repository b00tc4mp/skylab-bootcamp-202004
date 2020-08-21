const retrieveSummaryMembers = require('./retrieve-summary-members');

module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    addMemberDepartment: require('./add-member-department'),
    createDepartment: require('./create-department'),
    deleteDepartment: require('./next-aproach/delete-department'),
    addPetition: require('./add-petition'),
    createMeeting: require('./create-meeting'),
    createSummary: require('./create-summary'),
    changeWorkGroup: require('./change-work-group-pref'),
    createWorkGroup: require('./create-work-group'),
    retrieveDepartMembers:require('./retrieve-depart-members'),
    retrieveDepartments: require('./retrieve-departments'),
    retrieveAllPetitions: require('./retrieve-all-petitions'),
    retrieveWorkGroups: require('./retrieve-work-groups'),
    retrieveSoloWorkGroup: require('./retrieve-solo-work-group'),
    retrieveMeetings: require('./retrieve-meetings'),
    retrieveSummaries: require('./retrieve-summaries'),
    retrieveSummarys: require('./retrieve-summarys'),
    searchUsers: require('./search-users'),
    searchWorkGroups: require('./search-work-groups'),
    updatePetition: require('./update-petition'),
    updateSummary: require('./next-aproach/update-summary'),
    retrieveReadBy: require('./retrieve-read-by'),
    addReadBy: require('./add-read-by'),
    retrieveWorkGroup: require('./retrieve-work-group'),
    addMemberDepartment: require('./add-member-department'),
    addMemberSummary: require('./add-member-summary'),
    addDepartMembersSummary: require('./add-departmembers-summary'),
    retrieveSummaryMembers: require('./retrieve-summary-members')
    


}