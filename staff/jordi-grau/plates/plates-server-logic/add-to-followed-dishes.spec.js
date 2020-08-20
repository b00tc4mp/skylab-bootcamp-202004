require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { errors: { UnexistenceError, DuplicityError } } = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const addToFollowedDishes = require('./add-to-followed-dishes')

describe('Add followed dishes', ()=>{
    let userEmail, password, hash
    let restaurantName, restaurantEmail, cif, address, phone
    let dishName, position, price
    let users = []
    let tags = []
    let testDishes = []
    let dishesIds = []
    let followedDishes = []

    before(async () => {
        await mongoose.connect(MONGODB_URL)

        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach( async() =>{        
        userEmail = `userEmail${random()}@mail.com`
        password = `password${random()}`
        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ email: userEmail, password: hash })
        userId = user.id
        users.push(user)
        
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

        describe('Asynchronous test', async() =>{
            it('should add a dish to followed dishes with correct data', async() => {
                dishId = dishesIds[0]
                followedDish = await addToFollowedDishes(dishId, userId)
                const followedDishes = await Dish.find({_id: dishId ,followers: userId})       

                expect(followedDishes.length).to.equal(1)
                expect(followedDishes[0].name).to.equal(testDishes[0].name)        
            })

            it('should throw an error when a wrong dishId is passed', async ()=>{
                try {
                    dishId = "5f3d44b4aa9534157519a9b2"
                    followedDishes = await addToFollowedDishes(dishId, userId)
                } catch (error) {
                    expect(followedDishes.length).to.equal(0)
                    expect(error).to.be.instanceOf(UnexistenceError)
                    expect(error.message).to.equal(`Dish withd id: ${dishId} does not exist`)   
                }
            })

            it('should throw an error when a wrong userId is passed', async ()=>{
                try {
                    userId = "5f3d44b4aa9534157519a9b2"
                    followedDishes = await addToFollowedDishes(dishId, userId)
                } catch (error) {
                    expect(followedDishes.length).to.equal(0)
                    expect(error).to.be.instanceOf(UnexistenceError)
                    expect(error.message).to.equal(`User with id: ${userId} does not exist`)   
                }
            })

            it('should throw an error when user already follows a dish', async() => {
                try {
                    dishId = dishesIds[0]                    
                    await Dish.findByIdAndUpdate(dishId, {$addToSet: {followers: userId}})
                    followedDishes = await addToFollowedDishes(dishId, userId)                   
                } catch (error) {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal(`User with id: ${userId} already follows dish with id: ${dishId}`)
                }
            })
        })
        
        describe('Synchronous test', () =>{
            it('should trhow an error when no dishId is passed', () =>{
                try{ 
                const fakeDishId = []
                dishId = fakeDishId
                followedDish =  addToFollowedDishes(dishId, userId)
                const followedDishes =  Dish.find({_id: dishId ,followers: userId})  
                }
                catch (error) {
                    expect(error).to.be.instanceOf(TypeError)
                    expect(error.message).to.equal(`${dishId} is not a string`)
                }
            })
    
            it('should trhow an error when no userId is passed', () =>{
                try{ const fakeUserId = []
                userId = fakeUserId
                followedDish =  addToFollowedDishes(dishId, userId)
                const followedDishes =  Dish.find({_id: dishId ,followers: userId})  
                }
                catch (error) {
                    expect(error).to.be.instanceOf(TypeError)
                    expect(error.message).to.equal(`${userId} is not a string`)
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