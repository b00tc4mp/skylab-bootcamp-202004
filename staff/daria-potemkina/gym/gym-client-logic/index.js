module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    retrieveFutures: require('./retrieve-futures'),
    retrieveOptions: require('./retrieve-options'),
    retrieveUserBalance: require('./retrieve-user-balance'),
    retrieveUserCard: require('./retrieve-user-card'),
    retrieveFuturePrices: require('./retrieve-future-prices'),
    retrieveUnderlyingPrice: require('./retrieve-underlying-price'),
    retrieveUserAssetAllocation: require('./retrieve-user-asset-allocation'),
    searchProducts: require('./search-products'),
    addProduct: require('./add-product'),
    addUserCard: require('./add-user-card'),
    retrieveUserPortfolio: require('./retrieve-user-portfolio')
}