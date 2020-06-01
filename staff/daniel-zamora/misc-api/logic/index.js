module.exports = {
    register: require('./register-user'),
    login: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    addContact: require('./add-contact'),
    searchUsers: require('./search-users'),
    unregisterUser: require('./unregister-user'),
    updateUser: require('./update-user')

}