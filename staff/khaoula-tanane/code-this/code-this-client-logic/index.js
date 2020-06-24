module.exports = {
    registerUser: require('./register-user'),
    context: require('./context'),
    authenticateUser: require('./authenticate-user'),
    retrieveChallenges: require('./retrieve-challenges'),
    retrieveCategories: require('./retrieve-categories'),
    retrieveCategory: require('./retrieve-category'),
    retrieveUser: require('./retrieve-user'),
    checkTest: require('./check-test'),
    savePossibleSolution: require('./save-possible-solution'),
    createChallenge: require('./create-challenge'), 
    createCategory: require('./create-category'),
    deletecategory: require('./delete-category')
}