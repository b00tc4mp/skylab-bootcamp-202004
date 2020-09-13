require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET }} = process
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
global.fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { errors: { UnexistenceError, DuplicityError, VoidError}} = require('plates-commons')
const { random } = Math
const { expect } = require('chai')
const context = require('./context')
context.API_URL = API_URL
context.storage = {}
const createDish = require('./create-dish')

describe('client logic: create dish', () =>{
    let userEmail, password, hash
    let restaurantName, restaurantEmail, cif, address, phone, restaurantId
    let dishName, position, price
    let tags =  []

    before( ()=>{
       mongoose.connect(MONGODB_URL) 
       Promise.all([
           User.deleteMany(),
           Restaurant.deleteMany(),
           Dish.deleteMany()
       ])
    })

    beforeEach( async()=>{
       await User.deleteMany()
       await Restaurant.deleteMany()
        userEmail = 'user@mail.com'
        password = '12341234'
        hash =  await bcrypt.hash(password, 10)
        const { id } = await User.create({email: userEmail,password: hash })
        const userId = id

        const token = jwt.sign( {sub: userId}, TEST_SECRET, { expiresIn: '1d'})
        context.storage.token = token

        restaurantName = "Restaurant"
        restaurantEmail = 'restaurant@mail.com'
        cif = 'restaurantcif1234'
        address = 'Restaurant Street 11'
        phone = '555111999'
        
        const _restaurant = await Restaurant.create({ name: restaurantName, email: restaurantEmail, cif, address, phone})
        restaurantId = _restaurant.id.toString()

        dishName = 'dishName'
        position = `${parseInt(random() * 4, 10)}`
        tags = ["good taste", 'veggie', 'fresh', 'gluten free', 'cool']
        price =  parseInt(random() * 30, 10)    
    })

    it('should create a dish on correct data', async() =>{
       debugger
        await createDish(restaurantId, dishName ,position, tags, price)
        const result = await Dish.findOne({restaurantId, name: dishName})
        expect(result.position).to.equal(position)
        expect(result.name).to.equal(dishName)
        //expect(result.tags[0]).to.equal(tags[0])
        expect(result.price).to.equal(price)  
    })
    it('should throw an error on wrong restaurant Id', async() =>{
        try {
            restaurantId = "5f492bec67c2876820aaa56b"
           
            await createDish(restaurantId, dishName ,position, tags, price)
        } catch (error) {
            expect(error).to.be.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`restaurant with id: ${restaurantId} does not exist`)  
        }
    })
    it('should throw a Duplicity error when a dish name is duplicated', async() =>{
        
        try {
            await Dish.create({restaurantId, name: dishName ,position, tags, price})
            await createDish(restaurantId, dishName ,position, tags, price)
        } catch (error) {   
            //expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`Dish with name ${dishName}, and position ${position} in restaurant with id ${restaurantId} already exists`)   
        }
    })
    it('should throw am error on non string dish name', ()=>{
        try {
            dishName = 1234
            createDish(restaurtantId,  dishName ,position, tags, price)
        } catch (error) {
            expect(error).to.exist
        }
    })
    it('should throw am error on non string position', ()=>{
        try {
            position = 1234
            createDish(restaurtantId,  dishName ,position, tags, price)
        } catch (error) {
            expect(error).to.exist
        }
    })
    it('should throw am error on no numeric price', ()=>{
        try {
            price = "eleven"
            createDish(restaurtantId,  dishName ,position, tags, price)
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