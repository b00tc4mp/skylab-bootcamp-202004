module.exports = {
    context: require('./context'),
    isUserAuthenticated: require('./is-user-authenticated'),
    isGuestUser: require('./is-guest-user'),
    registerEstablishment: require('./register-establishment'),
    authenticate: require('./authenticate'),
    retrieveEstablishment: require('./retrieve-establishment'),
    retrieveTables: require('./retrieve-tables'),
    toggleTableOrder: require('./toggle-table-order'),
    retrieveOrders: require('./retrieve-orders'),
    retrieveDishes: require('./retrieve-dishes'),
    addDishesToOrder: require('./add-dishes-to-order'),
    retrieveOrderDishes: require('./retrieve-order-dishes')
}