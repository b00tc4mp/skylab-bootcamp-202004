require('dotenv').config()
const { env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose, models: {User, Restaurant, Dish}} = require('plates-data')
const { errors: {UnexistenceError}} = require('plates-commons')
const { random } =  Math
const bcrypt = require('bcryptjs')
const { expect } = require('chai')
const retrieveFollowedDishes = require('./retrieve-followed-dishes')
const { VoidError } = require('plates-commons/errors')


describe('Add retrieve followed dishes', ()=>{
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
        userId = users[0].id
        dishId = dishesIds[0]
        const followedDish = await Dish.findByIdAndUpdate(dishId, {$addToSet: {followers: userId}})
        followedDishes.push(followedDish)   
    })

    describe('Asynchronous test', async() =>{
        it('should retrieve all dishes followed by a user on correct data', async () =>{
            dishId = dishesIds[1]
            await Dish.findByIdAndUpdate(dishId, {$addToSet: {followers: userId}} )
            const result = await retrieveFollowedDishes(userId)
            expect(result.length).to.equal(2)
            expect(result[0].followers[0]).to.equal(userId)
            expect(result[1].followers[0]).to.equal(userId)   
        })
        it('should trow an error when a wrong userID is passed', async() => {
            try {
                userId = "5f3d44b4aa9534157519a9b9"
                const followed = await retrieveFollowedDishes(userId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`User with id: ${userId} does not exist`)    
            }
        })
      
    })

    describe('Synchronous test', ()=> {
        it('should throw an error when a nonString data is passed a userId', () =>{
            try {
                userId = "wrong userId"
                retrieveFollowedDishes(userId)
            } catch (error) {
                expect(error).to.be.instanceOf(typeError)
                expect(error.message).to.equal(`${userId} is not a string`)
            }
        })
        it('should throw an error when no userId data is passed ', () =>{
            try {
                const fakeUserId = []
                userId = fakeUserId
                retrieveFollowedDishes(userId)
            } catch (error) {
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