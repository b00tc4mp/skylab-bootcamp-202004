module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    createRestaurant: require('./create-restaurant'),
    createMenu: require('./create-menu'),
    searchPlate: require('./search-plate'),
    searchRestaurant: require('./search-restaurant'),
    retrieveUser: require('./retrieve-user'),
    retrieveRestaurant: require('./retrieve-restaurant'),
    createDish: require('./create-dish'),
    retrieveDish: require('./retrieve-dish'),
    searchDishByQuery: require('./search-dish-by-query'),
    searchDishByPostion: require('./search-dish-by-position'),
    searchDishByPrice: require('./search-dish-by-price'),
    addToFollowedDishes: require('./add-to-followed-dishes'),
    retrieveFollowedDishes: require('./retrieve-followed-dishes')
}