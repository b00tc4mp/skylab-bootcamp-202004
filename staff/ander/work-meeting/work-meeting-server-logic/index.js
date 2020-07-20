
module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    addMemberDepartment: require('./add-member-department'),
    createDepartment: require('./create-department'),
    deleteDepartment: require('./delete-department'),
    addPetition: require('./add-petition'),
    createMeeting: require('./create-meeting'),
    createSummary: require('./create-summary'),
    createWorkGroup: require('./create-work-group'),
    retrieveDepartmentAll: require('./retrieve-departmentsAll'),
    retrievePetitionAll: require('./retrieve-all-petitions'),
    retrieveWorkGroup: require('./retrieve-work-group'),
    searchUser: require('./search-users'),
    searchWorkGroup: require('./search-work-group'),
    updatePetition: require('./update-petition'),
    updateSummary: require('./update-summary'),
    updateUser: require('./update-user'),
    retrieveSoloWorkGroup: require('./retrieve-solo-work-group'),
    changeWorkGroup: require('./change-work-group-pref'),
    readByUsers: require('./read-by-users')

}