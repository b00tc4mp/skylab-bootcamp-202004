require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { errors: { UnexistenceError, VoidError, DuplicityError } } = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const searchDishByPosition = require('./search-dish-by-position')

describe('Search dish by position', () => {
    let userEmail, password, hash, restaurant, restaurantName, restaurantEmail, cif, address, phone
    let dishName, position
    let users = []
    let restaurants = []
    let dishesNames = []
    let tags = []
    let dishesIds = []
    let prices = []
    let testDishes = []
    let positions = []

    before(async () => {
        await mongoose.connect(MONGODB_URL)

        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach(async () => {
        debugger
        userEmail = `userEmail${random()}@mail.com`
        password = `password${random()}`
        hash = await bcrypt.hash(password, 10)
        const { id } = await User.create({ email: userEmail, password: hash })
        const userId = id
        users.push(userId)

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

    describe('Asynchronous test', () => {
        it('should do a search on correct dish position', async () => {
            position = testDishes[0].position
debugger
            const dishes = await searchDishByPosition(position)

            expect(dishes[0].position).to.equal(testDishes[0].position)
        })

        it('should throw an error on unexisting position', async () => {
            try {
                position = 'segundo'
                const dishes = await searchDishByPosition(position)
            } catch (error) {
                debugger
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`No results with position: ${position}`)
            }
        })
    })

    describe('Synchronous test', () => {
        it('should throw an error on a nonString position', () => {
            try {
                position = 1
                const dishes =  searchDishByPosition(position)
            } catch (error) {
              debugger
                expect(error).to.exist
                expect(error.message).to.equal('1 is not a string')
            }
        })

        it('should throw an error on a empty position', () => {
            try {
                position = ''
                const dishes =  searchDishByPosition(position)
            } catch (error) {
              debugger
                expect(error).to.exist
                expect(error.message).to.equal('string is empty or blank')
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