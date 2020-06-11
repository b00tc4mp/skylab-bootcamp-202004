require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const recipeIdeas = require('./recipe-ideas')
const {  random } = Math
const { expect } = require('chai')
require('cook-wise-commons/polyfills/json')
const { mongoose, models: { User, Recipes, Ingredients } } = require('cook-wise-data')
const bcrypt = require('bcryptjs')
const {  UnexistenceError } = require('cook-wise-commons/errors')


describe("search-recipe", () => {
    let name, surname, email, password, encryptedPassword, userId
    let recipeName, recipeAuthor, description, time, _ingredients = [], recipeId;
    let weekday
    let ingredients = {}, ingredientOneId,ingredientTwoId, ingredientThree
    let quantity, ingredientType;
 
    let user

    before(async () => {
        await mongoose.connect(MONGODB_URL, { unifiedTopology: true })
        await Promise.all([User.deleteMany(), Recipes.deleteMany(), Ingredients.deleteMany()])
    })

    beforeEach(async () => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, surname, email, password, encryptedPassword })
        userId = user.id

        ingredientName = `ingredientName-${random()}`;
        const newIngredientOne = await Ingredients.create({ name: ingredientName });
        ingredientOneId = newIngredientOne.id;

        quantity = random();
        ingredientType = newIngredientOne.id

        ingredientOne = { ingredientOne: ingredientType, quantity }

        recipeName = `recipeName-${random()}`;
        recipeAuthor = `author_${random()}`;
        description = `description-${random()}`;
        time = random();
        _ingredients.push(newIngredientOne)

        const recipe = await Recipes.create({ name: recipeName, author: recipeAuthor, description, time, ingredients: _ingredients })
        recipeId = recipe.id

        ingredientName = `ingredientName-${random()}`;
        const newIngredientTwo = await Ingredients.create({ name: ingredientName });
        ingredientTwoId = newIngredientTwo.id;

        quantity = random();
        ingredientType = newIngredientTwo.id

        ingredientTwo = { ingredientTwo: ingredientType, quantity }

        recipeName = `recipeName-${random()}`;
        recipeAuthor = `author_${random()}`;
        description = `description-${random()}`;
        time = random();
        _ingredients.push(newIngredientOne, newIngredientTwo)

        const recipeTwo = await Recipes.create({ name: recipeName, author: recipeAuthor, description, time,ingredients: _ingredients })
        recipeIdTwo = recipeTwo.id

        ingredientName = `ingredientName-${random()}`;
        const newIngredientThree = await Ingredients.create({ name: ingredientName });
        ingredientThreeId = newIngredientThree.id;

        quantity = random();
        ingredientType = newIngredientThree.id

        ingredientThree = { ingredientThree: ingredientType, quantity }

        recipeName = `recipeName-${random()}`;
        recipeAuthor = `author_${random()}`;
        description = `description-${random()}`;
        time = random();
        _ingredients.push(ingredientThree)

        const recipeThree = await Recipes.create({ name: recipeName, author: recipeAuthor, description, time, ingredients: _ingredients })
        recipeIdThree = recipeThree.id
        
        
        await User.findByIdAndUpdate(userId, { $set: { recipes: [recipe,recipeTwo,recipeIdThree] } });
        
        ingredients = {ingredients:[newIngredientOne.name,newIngredientTwo.name]}
        
        
        
    })
    
    
    afterEach(async () => {
        await Promise.all([User.deleteMany(), Ingredients.deleteMany(), Recipes.deleteMany(), ingredients.ingredients.pop()]);
    })

    it('should find recipes with any match and return results', async() => {
        result = await recipeIdeas(userId, ingredients)

        expect(result).to.exist
        expect(result).to.be.instanceof(Array)
        expect(result.length).to.be.equal(2)
    })



})