const context = require('./context')

module.exports = {
    get __context__(){
        return context
    },
    logoutUser: require('./logout-user'),
    //-----------------------------
    registerUser: require('./register-user'),
    loginUser: require('./login-user'),
    retrieveUser: require('./retrieve-user'),
    searchUser: require('./search-user'),
    updateUser:require('./update-user'),
    //-----------------------------
    findBook: require('./find-book'),
    createBook: require('./create-book'),
    deleteBook: require('./delete-book'),
    searchBook: require('./search-book'),
    retrieveBook : require('./retrieve-book'),
    acceptedShareBook: require('./accepted-share-book'),
    calculateDistanceBook: require('./calculate-distance-book'),
    //------------------------------
    sendMessage: require('./send-message'),
    retrieveMessages: require('./retrieve-received-messages'),
    deleteRecievedMessages: require('./delete-recieved-messages'),
    //--------------------------------------------
    listMyBooks: require('./list-my-books'),
    listShareBooks: require('./list-share-books'),
    //--------------------------------------------
    addRequestedBook:require('./add-requested-book'),
    retrieveRequestedBooks: require('./retrieve-requested-books'),
    //------------------------------
    toggleFollowing:require('./toggle-following'),
    retrieveFollowing: require('./retrieve-following'),
    //------------------------------
    updateCoordinates:require('./update-coordinates'),
    retrieveCoordinates: require('./retrieve-coordinates'),
    //--------------------------------
    addScore: require('./add-score'),
    retrieveAvgScore: require('./retrieve-avg-score'),
    //---------------------------------
    isUserSessionValid: require('./is-user-session-valid'),
    isUserLoggedIn: require('./is-user-logged-in')
}