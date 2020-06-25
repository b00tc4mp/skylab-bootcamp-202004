module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticate: require('./authenticate'),
    isUserAuthenticated: require('./is-user-authenticated'),
    isUserLogin: require('./is-user-logged-in'),
    registerWorker: require('./register-worker'),
    searchWorker: require('./search-worker'),
    retriveUser: require('./retrive-user'),
    addComent: require('./add-coment'),
    retriveChat: require('./retrive-chat'),
    retriveChats: require('./retrive-chats'),
    addMessage: require('./add-message'),
    creatChat: require('./creat-chat'),
    addRate: require('./add-rate'), 
    logoutUser: require('./logout-user'),
    updateUser: require('./update-user')
}