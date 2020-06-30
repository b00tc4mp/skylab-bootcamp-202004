module.exports = {
  context: require('./context'),
  registerUser: require('./register-user'),
  loginUser: require('./login-user'),
  isUserSessionValid: require('./is-user-session-valid'),
  retrieveUser: require('./retrieve-user'),
  isUserLoggedIn: require('./is-user-logged-in'),
  logoutUser: require('./logout-user'),
  searchLessons: require('./search-lessons'),
  placeOrder: require('./place-order'),
  updateCart: require('./update-cart'),
  retrieveCart: require('./retrieve-cart'),
  deleteCart: require('./delete-cart')
}
