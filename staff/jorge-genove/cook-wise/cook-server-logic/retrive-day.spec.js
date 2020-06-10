require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const toogleMenu= require('./toogle-menu-day')
const { floor, random } = Math
const { expect } = require('chai')
require('cook-wise-commons/polyfills/json')
const { mongoose, models: { User, Recipes, Ingredients } } = require('cook-wise-data')
const bcrypt = require('bcryptjs')
const { DuplicityError, UnexistenceError } = require('cook-wise-commons/errors')

describe("search-recipe", () => {
    const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    const TIMELINE = ["lunch", "dinner"]    
    let name, surname, email, password, encryptedPassword, userId
    let recipeName, recipeAuthor, description, time, ingredients = [], recipeId;
    let ingridient, ingredientId
    let quantity, ingredientType;
    let schudle = {}
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
        const newIngredient = await Ingredients.create({ name: ingredientName });
        ingredientId = newIngredient.id;

        quantity = random();
        ingredientType = newIngredient.id

        ingredient = { ingredient: ingredientType, quantity }

        recipeName = `recipeName-${random()}`;
        recipeAuthor = `author_${random()}`;
        description = `description-${random()}`;
        time = random();
        ingredients.push(ingredient)

        const recipe = await Recipes.create({ name: recipeName, author: recipeAuthor, description, time, ingredients })
        recipeId = recipe.id

        await User.findByIdAndUpdate(userId, { $addToSet: { recipes: recipe } });

        schudle.weekday = 'monday';
        schudle.timeline = 'lunch'

        recipe.schudle.push(schudle)

        schudle.weekday = 'monday'
        schudle.timeline = 'dinner'

        recipe.schudle.push(schudle)

        recipe.save
        


        

    })
    afterEach(async () => {
        await Promise.all([User.deleteMany(), Ingredients.deleteMany(), Recipes.deleteMany(), ingredients.pop()]);

    })

})