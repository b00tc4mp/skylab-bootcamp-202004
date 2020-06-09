require('cook-wise-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('cook-wise-commons')
const { models: { User} } = require('cook-wise-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        let favoriterecipes 
        const user = await User.findById(userId).populate({
            path: 'favoriterecipes',
            populate: {
                path: 'ingredients.ingredient',
                model: 'Ingredients'
            }
        }

        ).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        user.favoriterecipes.forEach(recipeFind => {
            delete recipeFind._id
            delete recipeFind.__v

            recipeFind.ingredients.forEach(singleIng => {

                delete singleIng._id
                const name = singleIng.ingredient.name

                singleIng.ingredient = name
            })

            favoriterecipes = user.favoriterecipes
            


        })
        return favoriterecipes
    })()
}
