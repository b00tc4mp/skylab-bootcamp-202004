const createMeeting = require('../work-meeting-api/routes/handlers/create-meeting');
const updateSummary = require('./update-summary');

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
    retrievePetitionAll: require('./retrieve-petitionsAll'),
    retrieveWorkGroup: require('./retrieve-work-group'),
    searchUser: require('./search-users'),
    searchWorkGroup: require('./search-work-group'),
    updatePetition: require('./update-petition'),
    updateSummary: require('./update-summary'),
    updateUser: require('./update-user')

}