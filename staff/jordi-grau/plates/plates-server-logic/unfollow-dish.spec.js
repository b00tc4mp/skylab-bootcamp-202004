require('dotenv').config()
const { env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: { User, Restaurant, Dish}} = require('plates-data')
const { random } = Math
const { errors: { UnexistenceError }} = require('plates-commons')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const unfollowDish = require('./unfollow-dish')

describe('unfollow dishes', () =>{
    let userEmail, password, hash
    let restaurantName, restaurantEmail, cif, address, phone
    let dishName, position, price
    let users = []
    let tags = []
    let testDishes = []
    let dishesIds = []
    let followedDishes = []

    before( async() =>{
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
            testDish = await Dish.create({ restaurantId: restaurant._id, name: dishName, position, tags, price: `${parseInt(random() * 30, 10)}`, followers: userId })
            const { _id, } = testDish
            dishId = _id.toString()
            dishesIds.push(dishId)
            testDishes.push(testDish)
        }
    })

    describe('Asynchornous test', () =>{
        it('should unfollow a dish when correct data is passed', async() =>{
            await unfollowDish(dishId, userId)
            const unfollowedDish = await Dish.findById(dishId)
            const unfollower = await Dish.find({_id: dishId, follower: userId})
            expect(unfollowedDish._id.toString()).to.equal(dishId)
            expect(unfollower.length).to.equal(0)
        })
        it('should throw an error when an unexisting dishId is passed', async() =>{
            try {
                dishId = "5f3d44b4aa9534157519a9b2"
                await unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`dish with id: ${dishId} does not exist`)
            }
        })
        it('should throw an error when an unexisting userId is passed', async() =>{
            try {
                userId = "5f3d44b4aa9534157519a9b2"
                await unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id: ${userId} does not exist`)
            }
        })
        it('should throw an error when user  is not already following a dish', async() =>{
            try {
                followers = []
                await Dish.findByIdAndUpdate(dishId, {$addToSet: {followers: followers}})
                await unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id: ${userId} does not follow dish with id: ${dishId}`)
            }           
        })
    })

    describe('Synchronous test', () =>{
        it('should throw an error when a non string is passed as dishId', ()=>{
            try {
                dishId = 2020
                unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal(`${dishId} is not a string`)
            }
        })
        it('should throw an error when a non string is passed as userId', ()=>{
            try {
                userId = 2020
                unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal(`${userId} is not a string`)
            }
        }) 
        it('should throw an error when an empty dishId is passed', ()=>{
            try {
                dishId = []
                unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal(`${dishId} is not a string`)
            }
        })
        it('should throw an error when an empty userId is passed ', ()=>{
            try {
                userId = 2020
                unfollowDish(dishId, userId)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal(`${userId} is not a string`)
            }
        })         
    })

    after( async()=>{
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
        mongoose.disconnect()
    })
})