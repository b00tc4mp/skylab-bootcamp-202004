const context = require('./context')

module.exports = {
    get __context__(){
        return context
    },
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    registerCohousing: require('./register-cohousing'),
    updateUser: require('./update-user'),
    retrieveLaundry: require('./retrieve-laundry'),
    addDateLaundry: require('./add-date-laundry'),
    deleteDateLaundry: require('./delete-date-laundry'),
    sendMessage: require('./send-message'),
    retrieveMessage: require('./retrieve-messages'),
    addFood: require('./add-food'),
    substractFood: require('./substract-food'),
    retrieveUserFoodList: require('./retrieve-user-food-list'),
    retrieveCohousing: require('./retrieve-cohousing'),
    updateCohousing: require('./update-cohousing'),
    retrieveAllUsersFoodList: require('./retrieve-all-users-food-list'),
    sendFoodList: require('./send-food-list'),
    joinCommunity: require('./join-community')
}