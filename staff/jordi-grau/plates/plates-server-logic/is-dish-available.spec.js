require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { errors: { UnexistenceError, VoidError, DuplicityError } } = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const isDishAvailable = require('./is-dish-available')

describe('is a dish availabe?', () => {
    let userEmail, password, hash, restaurant, restaurantName, restaurantEmail, cif, address, phone
    let dishName, position
    let users = []
    let restaurants = []
    let dishesNames = []
    let tags = []
    let dishesIds = []
    let prices = []
    let testDishes = []

    before(async () => {
        await mongoose.connect(MONGODB_URL)

        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach(async () => {
        userEmail = `userEmail${random()}@mail.com`
        password = `password${random()}`
        hash = await bcrypt.hash(password, 10)
        const { id } = await User.create({ email: userEmail, password: hash })
        const userId = id
        
        restaurantName = `restaurantName${random()}`
        restaurantEmail = `restaurantEmail${random()}@mail.com`
        cif = `cif${random()}`
        address = `address${random()}`
        phone = random() * 100000
        restaurant = await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone })
        restaurants.push(restaurant)

        for (let i = 0; i < 9; i++) {
            dishName = `dishName${i}`
            position = `${parseInt(random() * 4, 10)}`
            position = position.toString()
            tags = ['good taste', 'veggie', 'fresh', 'gluten free', 'cool']
            testDish = await Dish.create({ restaurantId: restaurant._id, name: dishName, position, tags, price: `${parseInt(random() * 30, 10)}` })
            const { _id, price } = testDish
            dishId = _id.toString()
            dishesIds.push(dishId)
            prices.push(price)
            dishesNames.push(dishName)
            testDishes.push(testDish)
        }
    })

    describe('is dish avialable?', () => {
        it('should return true or false on correct data', async () => {
            debugger
            dishId = dishesIds[0]
            const secondDishId = dishesIds[1]
            const result = await isDishAvailable(dishId)
            await Dish.findByIdAndUpdate(secondDishId, { $set: { available: false}})
            const secondResult = await isDishAvailable(secondDishId)
            
            expect(result).to.equal(true)
            expect(secondResult).to.equal(false)
        })

        it('should throw an error on unexisting dishId', async () => {
            try {
                dishId = "5f43fc19c269e5cbe95f1318"
                const result = await isDishAvailable(dishId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`dish with id: ${dishId} does not exist`)
            }
        })
    })

    describe('Validations', () => {
        it('should throw an error on a nonString dishId', () => {
            try {
                dishId = 1
                const dish=  isDishAvailable(dishId)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`${dishId} is not a string`)
            }
        })

        it('should throw an error on an empty dishId', () => {
            try {
                const fakeDishId = []
                dishId = fakeDishId
                const dish=  isDishAvailable(dishId)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`${dishId} is not a string`)
            }
        })
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
        mongoose.disconnect()
    })
})