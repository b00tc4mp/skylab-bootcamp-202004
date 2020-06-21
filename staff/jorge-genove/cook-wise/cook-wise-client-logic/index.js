

module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveUser: require('./retrieve-user'),
    retrieveDay: require('./retrieve-day'),
    retrieveRecipe: require('./retrieve-recipe'),
    retrieveFavorites: require('./retrieve-favorites'),
    deleteRecipe: require('./delete-recipe'),
    searchRecipe: require('./search-recipe'),
    toogleFavorites: require('./toogle-favorites'),
    retrieveMenu: require('./retrieve-menu'),
    groceryList: require('./grocery-list'),
    toogleMenu: require('./toogle-menu'),
    deleteDayMenu: require('./delete-day-menu'),
    deleteTimeline: require('./delete-timeline-menu'),
    recipeSearchIdeas: require('./recipe-ideas')
}