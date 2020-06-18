

module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveUser: require('./retrieve-user'),
    retrieveDay: require('./retrieve-day'),
    retrieveRecipe: require('./retrieve-recipe'),
    retrieveFavorites: require('./retrieve-favorites'),
    deleteRecipe: require('./delete-recipe')
}