module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    toggleEscapeRoomPending: require('./toggle-escape-room-pending'),
    toggleEscapeRoomParticipated: require('./toggle-escape-room-participated'),
    toggleEscapeRoomFavorites: require('./toggle-escape-room-favorites'),
    toggleFollowUser: require('./toggle-follow-user')
}