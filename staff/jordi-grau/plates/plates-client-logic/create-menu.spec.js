require('dotenv').config()
const { env: {TEST_MONGODB_UR: MONGODB_URL, TEST_SECRET}} = process
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
const { errors: { DuplicityError, VoidError, UnexistenceError }} = require('plates-commons')
global.fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { expect } = require('chai')
const { random } = Math
const { context, API_URL } = require('./context')
context.API_URL = API_URL
context.storage = {}
const createMenu = require('create-menu')

describe('create menu, client logic', () =>{
    let userEmail, password, hash
    let restaurantName, restaurantEmail, cif, address, phone, restaurantId
    let dishesIds = []
    let dishes = []

    before( async() =>{
        mongoose.connect(API_URL)
        Promise.all([
            User.deleteMany,
            Restaurant.deleteMany()
        ])
    })

    beforeEach( async() => {
        userEmail = 'user@mail.com'
        password = '12341234'
        hash = await bcrypt.hash(password, 10)

        const { id } = await User.create({ email: userEmail, password: hash})
        const userId = id

        const token = jwt.sign( {sub: userId}, TEST_SECRET, { expiresIn: '1d'})
        context.storage.token = token

        restaurantName = "Restaurant"
        restaurantEmail = 'restaurant@mail.com'
        cif = 'restaurantcif1234'
        address = 'Restaurant Street 11'
        phone = '555111999'
        
        const restaurant = await Restaurant.create({ name: restaurantName, email: restaurantEmail, cif, address, phone})
        restaurantId = restaurant.id.toString()     

        const dish = Dish.create({name: 'Tortilla de patatas'})
        let dishId = dish.id
        for(let i = 0; i < 5; i++){ 
            const dish = new Dish({name: `name-${i}`})

            dishesIds.push(dish.id)
            dishes.push(dish)
        }       
    })

    it('should create a menu on correct data', async() => {
        const menu = await createMenu(userId, restaurantId, dishesIds)
        expect(menu._id[1]).to.equal(dishesIds[1])

    })

    it('should retun an error when userId no correct type is passed', () =>{
        userId = {}
        try {
            createMenu(userId, restaurantId, dishesIds)
        } catch (error) {
            expect(error.message).to.equal(`${userId} is not a string`)
        }
    })
    it('should returna unexistence error, when a wrongId is passed', async()=>{
        userId = dishesIds[0]
        try {
            await createMenu(userId, restaurantId, dishesIds)
        } catch (error) {
            expect(error.message).to.equal(`user with id: ${userId} does not exist`)
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
