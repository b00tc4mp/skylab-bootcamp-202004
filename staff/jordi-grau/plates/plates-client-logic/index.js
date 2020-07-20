module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    createRestaurant: require('./create-restaurant'),
    retrieveRestaurant: require('./retrieve-restaurant'),
    searchRestaurant: require('./search-restaurant'),
    retrieveUser: require('./retrieve-user'),
    logoutUser: require('./logout-user')

}