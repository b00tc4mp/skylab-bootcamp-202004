require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET }} = process
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
require('plates-commons/polyfills/xhr')
require('plates-commons/polyfills/json')
const { errors: {UnexistenceError, DuplicityError, VoidError }} = require('plates-commons')
const jwt = require('jsonwebtoken')
const { random } = Math
const { expect } = require('chai')
const context = require('./context')
context.API_URL = API_URL
context.storage = {}
global.fetch = require('node-fetch')
const bcrypt = require('bcryptjs')
const addToFollowedDishes = require('./add-to-followed-dishes')

describe(' add to followed dishes', () =>{
    let userEmail, password, hash
    let restaurantName, restaurantEmail, cif, address, phone
    let dishName, position, price
    let users = []
    let tags = []
    let testDishes = []
    let dishesIds = []
    let followedDishes = []

    before( async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach( async()=> {
        userEmail = 'usertest@mail.com'
        password = '12341234'
        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ email: userEmail, password: hash })
        userId = user.id
        users.push(user)
        debugger
        const token = jwt.sign( {sub: userId}, TEST_SECRET, { expiresIn: '1d'})
        context.storage.token = token

        restaurantName = `restaurantName${random()}`
        restaurantEmail = `restaurantEmail${random()}@mail.com`
        cif = `cif${random()}`
        address = `address${random()}`
        phone = random() * 100000
        userId = users[0].id
        restaurant = await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone })
        
        for (let i = 0; i < 9; i++) {
            dishName = `dishName${i}`
            position = `${parseInt(random() * 4, 10)}`
            position = position.toString()
            tags = ['good taste', 'veggie', 'fresh', 'gluten free', 'cool']
            testDish = await Dish.create({ restaurantId: restaurant._id, name: dishName, position, tags, price: `${parseInt(random() * 30, 10)}` })
            const { _id, } = testDish
            dishId = _id.toString()
            dishesIds.push(dishId)
            testDishes.push(testDish)
        }
    })

    
        
    it('should add a dish to followed dishes', async() =>{
        debugger
            await addToFollowedDishes(dishId, userId)
            const followedDishes = await Dish.find({_id: dishId ,followers: userId})
            expect(followedDishes.length).to.equal(0) 

    })
    

    after( async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            User.deleteMany()
        ])
        await mongoose.disconnect()
    })



})