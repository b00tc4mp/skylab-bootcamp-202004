module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createChallenge: require('./create-challenge'),
    retrieveChallenges: require('./retrieve-challenges'),
    createCategory: require('./create-category'),
    retrieveCategories: require('./retrieve-categories'),
    retrieveCategory: require('./retrieve-category'),
    savePossibleSolution: require('./save-possible-solution'),
    deleteCategory: require('./delete-category'),
    deleteChallenge: require('./delete-challenge')
}