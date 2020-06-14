module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveFutures: require('./retrieve-futures'),
    retrieveOptions: require('./retrieve-options'),
    retrieveUserBalance: require('./retrieve-user-balance'),
    retrieveFuturePrices: require('./retrieve-future-prices'),
    retrieveUnderlyingPrice: require('./retrieve-underlying-price'),
    serachProducts: require('./search-products'),
    addProduct: require('./add-product')
}