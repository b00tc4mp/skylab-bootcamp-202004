module.exports = {
    registerEstablishment: require('./register-establishment'),
    registerWorker: require('./register-worker.js'),
    authenticate: require('./authenticate'),
    retrieveWorker: require('./retrieve-worker'),
    retrieveDishes: require('./retrieve-dishes'),
    addDish: require('./add-dish'),
    retrieveEstablishment: require('./retrieve-establishment'),
    assignNumOfTables: require('./assign-num-of-tables'),
    toggleTableOrder: require('./toggle-table-order'),
    addDishesToOrder: require('./add-dishes-to-order'),
    retrieveTables: require('./retrieve-tables'),
    retrieveOrders: require('./retrieve-orders'),
    retrieveOrderDishes: require('./retrieve-order-dishes')
}