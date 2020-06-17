module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createWorkspace: require('./create-workspace'),
    retrieveUserWorkspaces: require('./retrieve-user-workspaces'),
    retrieveWorkspaceById: require('./retrieve-workspace-by-id'),
    retrieveByLocation: require('./retrieve-by-location'),
    searchWorkspaces: require('./search-workspaces'),
    addToFavorites: require('./add-to-favorites'),
    retrieveFavorites: require('./retrieve-favorites'),
    searchFavorites: require('./search-favorites'),
    uploadImage: require('./upload-image'),
}