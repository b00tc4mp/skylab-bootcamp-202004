require('cook-wise-commons/polyfills/string')
require('cook-wise-commons/polyfills/number')
const { errors: {UnexistenceError } } = require('cook-wise-commons')
const { models: { Recipes, User} } = require('cook-wise-data')

/**
 * 
 * Creates a new recipe with embedded ingredientsQuantity
 * 
 * params {Object} data data to create the recipe
 * 
 */
module.exports = ({name, author, time, ingredients, description,userId}) => {
    String.validate.notVoid(name)
    String.validate.notVoid(author)
    console.log(userId)
    String.validate.notVoid(userId)
    Number.validate(time)
    if (!(ingredients instanceof Array)) throw new Error('you must put ingredients on the recipe')
    String.validate.notVoid(description)

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        
        ingredients.forEach((ingredient) => {
            
            if (ingredient.quantity <= 0)  throw new UnexistenceError(`ingredient must have a quantity`);
        });
        
        const recipe = await Recipes.create({
            name, author, description, time, ingredients 
        });
        await User.findByIdAndUpdate(userId, {$addToSet: {recipes: recipe}});

        return; 
    })()
}