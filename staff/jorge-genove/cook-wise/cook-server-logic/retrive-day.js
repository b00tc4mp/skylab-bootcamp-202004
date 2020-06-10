require('cook-wise-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('cook-wise-commons')
const { models: { Recipes, User} } = require('cook-wise-data')

module.exports = (weekday, userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        
        const user = await User.findById(userId).populate('user.schedule').lean()
        let recipeArray = []
        
        for (var i = 0; i < user.schedule.length; i++){
        if(user.schedule[i].weekday === weekday) { 
            recipeArray.push(user.schedule[i].recipe)}
        
        for (var j = 0; j < recipeArray.length; j++){
            await Recipes.findById(recipeArray[j])
        }
            

        }
        
    })()
}
