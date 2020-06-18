module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    loginUser: require('./login-user'),
    // isUserAuthenticated: require('./is-user-authenticated'),
    retrieveUser: require('./retrieve-user'),
    toggleEscapeRoom: require('./toggle-escape-room'),
    toggleFollowUser: require('./toggle-follow-user'),
    retrieveEscapeRooms: require('./retrieve-escape-rooms'),
    retrieveFollowing: require('./retrieve-following'),
    searchEscapeRoom: require('./search-escape-room'),
    searchUsers: require('./search-users'),
    retrieveFollowingIds: require('./retrieve-following-ids'),
    retrieveEscapeIds: require('./retrieve-escape-ids'),
    suggestEscapeRooms: require('./suggest-escape-rooms')
}