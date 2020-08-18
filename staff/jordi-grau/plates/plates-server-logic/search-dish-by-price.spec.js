require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { errors: {UnexistenceError} } = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const searchDishByPrice = require('./search-dish-by-price')
const { ValueError } = require('plates-commons/errors')

describe('Search dish by price', () => {
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
            tags = ['good taste', 'veggie', 'fresh', 'gluten free', 'cool']
            testDish = await Dish.create({ restaurantId: restaurant._id, name: dishName, position, tags, price: `${parseInt(random() * 30, 10)}` })
            const { _id, price} = testDish
            dishId = _id.toString()
            dishesIds.push(dishId)
            prices.push(price)
            dishesNames.push(dishName)
            testDishes.push(testDish)
        }
    })

    describe('Asynchronous test', () => {
        it('should do a search on correct price range', async() => {
            
            let min = 5
            let max = 20
            const dishes = await searchDishByPrice(min, max)
            
            expect(dishes[0].price).to.greaterThan(4)
        })

        it('should do a search with only min price', async() => {
            await Dish.create({ restaurantId: restaurant._id, name: 'Paella', position, tags, price: 5 })
            min = 5
            const dishes = await searchDishByPrice(min)
        
            expect(dishes[0].price).to.greaterThan(4)          
        })

        it('should do a search with only max price', async() => {
            await Dish.create({ restaurantId: restaurant._id, name: 'Paella', position, tags, price: 25 })
            max = 25
            const dishes = await searchDishByPrice(max)
            
            expect(dishes[0].price).to.greaterThan(24)
        })

        it('should return an error when no matching results', async() =>{
            try {
                min = min *1000
                max = min + 1
                await searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`No results between: ${min} and: ${max}`)
            }
        })
    })
    
    describe('Synchronous test', ()=>{
        it('should throw an error when min is not a number', ()=> {
            try {
                min = 'NotaNumber'
                max = 100

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('NotaNumber is not a number')
            }
        })

        it('should throw an error when max is not a number', ()=> {
            try {
                min = 10
                max = 'NotaMaxNumber'

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('NotaMaxNumber is not a number')
            }
        })

        it('should throw an error when min is not a positive number', ()=> {
            try {
                min = -10
                max = 30

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(ValueError)
                expect(error.message).to.equal('-10 is not a positive number')
            }
        })

        it('should throw an error when max is not a positive number', ()=> {
            try {
                min = 10
                max = -30

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(ValueError)
                expect(error.message).to.equal('-30 is not a positive number')
            }
        })

        it('should throw an error when min is lower than 1', ()=> {
            try {
                min = 0
                max = 30

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(ValueError)
                expect(error.message).to.equal('0 is not greater or equal than 1')
            }
        })

        
        it('should throw an error when min is  greater than max', ()=> {
            try {
                min = 100
                max = 30

                searchDishByPrice(min, max)
            } catch (error) {
                expect(error).to.be.instanceOf(ValueError)
                expect(error.message).to.equal(`${max} is not greater or equal than ${min}`)
            }
        })
    })
        
    after( async() =>{
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()      
        ])
        mongoose.disconnect()
    })
})