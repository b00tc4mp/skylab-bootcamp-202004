module.exports = {
    register : require('./register-user'),
    authenticated : require('./authenticate-user'),
    retrieveUser : require('./retrieve-user'),
    addContact : require('./add-contact'),
    listContact : require('./list-contacts'),
    removeContacts : require('./remove-contact'),
    searchContacts : require('./search-contacts'),
    addStickie : require('./add-stickie'),
    listStickies : require('./list-stickies'),
    removeStickies : require('./remove-stickie'),
    searchStickies : require('./search-stickies')
}