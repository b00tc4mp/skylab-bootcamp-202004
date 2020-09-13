require('dotenv').config()
const { env: {TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET}} = process
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
global.fetch = require('node-fetch')
const { errors: { DuplicityError, VoidError, UnexistenceError }} = require('plates-commons')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { expect } = require('chai')
const { random } = Math
const  context  = require('./context')
context.API_URL = API_URL
context.storage = {}
const createMenu = require('./create-menu')

describe('create menu, client logic', () =>{
    let userEmail, password, hash, userId
    let restaurantName, restaurantEmail, cif, address, phone, restaurantId
    let dishesIds = []
    let dishes = []

    before( async() =>{
        mongoose.connect(MONGODB_URL)
        Promise.all([
            User.deleteMany,
            Restaurant.deleteMany(),
            Dish.deleteMany
        ])
    })

    beforeEach( async() => {
        userEmail = `user${random()}@mail.com`
        password = '12341234'
        hash = await bcrypt.hash(password, 10)
debugger
        const { id } = await User.create({ email: userEmail, password: hash})
        userId = id.toString()

        const token = jwt.sign( {sub: userId}, TEST_SECRET, { expiresIn: '1d'})
        context.storage.token = token

        restaurantName = "Restaurant"
        restaurantEmail = 'restaurant@mail.com'
        cif = `cif${random()*10000}`
        address = 'Restaurant Street 11'
        phone = '555111999'
        
        const _restaurant = await Restaurant.create({ name: restaurantName, email: restaurantEmail, cif, address, phone})
        restaurantId = _restaurant.id.toString()

        const dish = await Dish.create({restaurantId: restaurantId, name: 'Tortilla de patatas', price: 10})
        dishId = dish.id.toString()
        

            // dishesIds.push(dish.id)
            // dishes.push(dish)
               
    })

    it('should create a menu on correct data', async() => {
        await createMenu(userId, restaurantId, dishId)
        debugger
        const menu = await Restaurant.findById(restaurantId)
        //expect(menu.dishes[0]).to.equal(dishId)
        expect(menu.name).to.equal('Restaurant')
    })

    it('should retun an error when userId no correct type is passed', () =>{
        userId = []
        try {
            createMenu(userId, restaurantId, dishesIds)
        } catch (error) {
            expect(error.message).to.equal(`${userId} is not a string`)
        }
    })
    it('should return a unexistence error, when a wrongId is passed', async()=>{
        await User.deleteMany()        
        //userId = '5f5e43bca6db441980fbed90'
        try {
            await createMenu(userId, restaurantId, dishesIds)
        } catch (error) {
            
            expect(error).to.exist
        }
    })

    after( async() =>{
            await Promise.all([
                User.deleteMany(),
                Restaurant.deleteMany(),
                Dish.deleteMany()
                ])
                await mongoose.disconnect()
    })


})
