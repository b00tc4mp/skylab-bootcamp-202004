const { model } = require('mongoose')
const { user, ingredients, ingredientsQuantity} = require('./schemas')

module.exports = {
    User: model('User',user),
    Ingredients: model('Ingredients',ingredients),
    ingredientsQuantity: model('IngredientsQuantity', ingredientsQuantity)
}