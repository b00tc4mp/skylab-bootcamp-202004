require('cook-wise-commons/polyfills/string')
const { errors: {  UnexistenceError } } = require('cook-wise-commons')
const { models: { User } } = require('cook-wise-data')

module.exports = (query, userId) => {
    String.validate.notVoid(query)
    String.validate.notVoid(userId)

    return (async () => {
       
        const user =  await User.findById(userId)
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
       
       let recipesFind = user.recipes.filter(recipe => recipe.name === query 
       || recipe.author === query);

       if (recipesFind.length === 0) throw new UnexistenceError(`${query} is not found like recipe or author`)
        
       return recipesFind
       })()

}