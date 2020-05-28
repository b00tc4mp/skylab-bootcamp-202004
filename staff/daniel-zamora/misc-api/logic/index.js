module.exports = {
    register: require('./register-user'),
    login: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    addContact: require('./add-contact')
}