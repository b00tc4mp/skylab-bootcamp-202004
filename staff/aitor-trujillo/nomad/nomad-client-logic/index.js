module.exports = {
    context: require('./context'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    isUserAuthenticated: require('./is-user-authenticated'),
    createWorkspace: require('./create-workspace'),
    uploadImage: require('./upload-image'),
    retrieveUserWorkspaces: require('./retrieve-user-workspaces'),
    retrieveWorkspaces: require('./retrieve-workspaces'),
    // retrieveUser: require('./retrieve-user')
}