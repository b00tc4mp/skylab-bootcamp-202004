module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    isUserSessionValid: require('./is-user-session-valid'),
    isUserLoggedIn: require('./is-user-logged-in'),
    createRestaurant: require('./create-restaurant'),
    retrieveRestaurant: require('./retrieve-restaurant'),
    searchRestaurant: require('./search-restaurant'),
    retrieveUser: require('./retrieve-user'),
    logoutUser: require('./logout-user'),
    addToFollowedDishes: require('./add-to-followed-dishes'),
    createDish: require('./create-dish'),
    createMenu: require('./create-menu')
}