

module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    addMemberDepartment: require('./add-member-department'),
    addPetition: require('./add-petition'),
    createDepartment: require('./create-department'),
    createMeeting: require('./create-meeting'),
    createSummary: require('./create-summary'),
    createWorkGroup:require('./create-work-group'),
    retrieveDepartmentAll: require('./retrieve-departmentAll'),
    retrievePetitionAll:require('./retrieve-petitionAll'),
    retrieveWorkGroup:require('./retrieve-work-group'),
    searchUser: require('./search-users'),
    searchWorkGroup: require('./search-work-groups'),
    updatePetition: require('./update-petition'),
    updateSummary: require('./update-summary'),
    updateUser: require('./update-user'),
    retrieveWorkGroupPref: require('./retrieve-work-group-pref'),
    changeWorkGroup: require('./change-work-group-pref'),
    addReadBy: require('./add-read-by'),
    retrieveReadBy: require('./retrieve-read-by')


}