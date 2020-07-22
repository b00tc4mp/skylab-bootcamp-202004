/* istanbul ignore file */

const context = require("./context")

module.exports = {
    get __context__() { return context },
    registerUser: require("./register-user"),
    authenticateUser: require("./authenticate-user"),
    retrieveUser: require("./retrieve-user"),
    findNearbyBars: require("./find-nearby-bars"),
    findNearbyRestaurants: require("./find-nearby-restaurants"),
    addFavourite: require("./add-favourite"),
    getFavourites: require("./get-favourites"),
    removeFavourite: require("./remove-favourite"),
    logout: require("./logout"),
    postComment: require("./post-comment"),
    getUserComments: require("./get-user-comments")
}