module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    unRegister: require('./unregister-user'),
    addProduct: require("./add-product"),
    retrieveProduct: require("./retrieve-product"),
    removeProduct: require("./remove-product"),
    addCart: require("./add-cart"),
    addToCart: require("./add-product-to-cart"),
    retrieveCart: require("./retrieve-cart"),
    removeFromCart: require("./remove-product-from-cart"),
    removeCart: require("./remove-cart"),
    makeOrder: require("./make-order"),
    retrieveOrder: require("./retrieve-order"),
    retrieveAllOrders: require("./retrieve-all-orders")
}