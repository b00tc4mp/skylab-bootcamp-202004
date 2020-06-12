

require('cook-wise-commons/polyfills/string')
require('cook-wise-commons/polyfills/number')
const { errors: {UnexistenceError } } = require('cook-wise-commons')
const { models: { Recipes, User} } = require('cook-wise-data')


module.exports = (userId, recipeId) => {
String.validate.notVoid(userId)
String.validate.notVoid(recipeId)

    return (async() => {
        const [user, recipe] = await Promise.all([
            User.findById(userId),
            Recipes.findById(recipeId)
        ]);
        
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        if(!recipe) throw new UnexistenceError(`recipe with id ${recipeId} does not exist`)

        await Promise.all([
            User.findByIdAndUpdate(userId, { 
                $pull: { recipes: recipeId, favoriterecipes: recipeId }
            }),
            Recipes.findByIdAndRemove(recipeId)
        ])

    })()
}