require('dotenv').config()

const { env: {  MONGODB_URL } } = process
const { mongoose } = require('cook-wise-data')

const retrieveRecipe = require('./retrieve-recipe')

mongoose.connect(MONGODB_URL)
    .then(() => retrieveRecipe('5edf91768e42b626f0583103'))
    .then((recipe) => console.log(recipe))
    .catch(console.error)