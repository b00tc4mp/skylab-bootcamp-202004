require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { errors: {UnexistenceError} } = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const searchDishByQuery = require('./search-dish-by-query')


describe('Search dish by query', () => {
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
        it('should do a search on correct dish name', async() => {
            const dishes = await searchDishByQuery(dishesNames[0])
            
            expect(dishes[0].name).to.equal(dishesNames[0])
        })
        
        
        it('should do a search on correct tag', async()=> {
           
            dishes = await searchDishByQuery('veggie')
            
            expect(dishes[0].tags).to.include('veggie')
        })

        it('should return an error doing a search on unexisting name ', async()=>{
            try {
                dishName = 'unexistingName'
                dishes = await searchDishByQuery(dishName)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)                
                expect(error.message).to.equal(`No results with ${query} search`)
            }
        } )
    })

    describe('Synchronous test', ()=> {
        it('should fail on non string name', ()=>{
            try {
                dishName = 1
                searchDishByQuery(dishName)
                
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('1 is not a string')
                
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