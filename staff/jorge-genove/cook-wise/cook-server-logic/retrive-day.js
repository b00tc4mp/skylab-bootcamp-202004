require('cook-wise-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('cook-wise-commons')
const { models: { Recipes, User } } = require('cook-wise-data')

module.exports = (weekday, userId) => {
    String.validate.notVoid(userId)
    let recipe
    return (async () => {

        const user = await User.findById(userId).populate('user.schedule').lean()
        let recipeArray = []
        let result = []

        for (var i = 0; i < user.schedule.length; i++) {
            if (user.schedule[i].weekday === weekday) {
                recipeArray.push(user.schedule[i].recipe)
            }
        }
        for (var j = 0; j < recipeArray.length; j++) {

            recipe = await Recipes.findById(recipeArray[j]).populate('ingredients.ingridient', "name").lean()

            delete recipe._id
            delete recipe.__v

            recipe.ingredients.forEach(singleIng => {
                delete singleIng._id
                const name = singleIng.ingredient.name

                singleIng.ingredient = name
                result.push(recipe)
            })
        }

        console.log(result)

    })()
}
