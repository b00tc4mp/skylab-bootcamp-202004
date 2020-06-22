require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET } } = process

const { expect } = require('chai')
const { random } = Math
const addFood = require('./add-food')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')


const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')
const atob = require('atob')

const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { mongoose: { ObjectId }, models: { User, Cohousing } } = require('coohappy-data')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode,  foodItem, foodItem_2, laundryNum, token

describe('logic - add-food', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()
        await Cohousing.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        nameCohousing = `name-${random()}`
        street = `street-${random()}`
        number = random()
        city = `city-${random()}`
        accessCode = randomAccessCode(name)
        laundryNum = 4

        foodItem = `fruit-${random()}`
        foodItem_2 = `fruit-${random()}`
        

        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        let address = { street, number, city }
        await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })
        token = await jwtPromised.sign({ sub: userId }, JWT_SECRET)
        await logic.__context__.storage.setItem('TOKEN',token);
    })

    describe('when food does not yet add to list and is empty', () => {

        it('should success on add new food item', async () => {

            await addFood(foodItem)
            const cohousing = await Cohousing.findOne({ members: userId })
            const user = await User.findById(userId)
            expect(user.foodList).to.exist
            expect(user.foodList[0].name).to.equal(foodItem)
            expect(user.foodList[0].weight).to.equal(0.5)
            expect(cohousing.foodList).to.exist
            expect(cohousing.foodList[0].name).to.equal(foodItem)
            expect(cohousing.foodList[0].weight).to.equal(0.5)
        })
    })

    describe('when food does not yet add to list and is there are more fruits', () => {

        beforeEach(async () => {
            await addFood(foodItem)
        })

        it('should success on add new food item', async () => {

            await addFood(foodItem_2)
            const cohousing = await Cohousing.findOne({ members: userId })
            const user = await User.findById(userId)
            expect(user.foodList).to.exist
            expect(user.foodList[0].name).to.equal(foodItem)
            expect(user.foodList[0].weight).to.equal(0.5)
            expect(user.foodList).to.exist
            expect(user.foodList[1].name).to.equal(foodItem_2)
            expect(user.foodList[1].weight).to.equal(0.5)
            expect(cohousing.foodList).to.exist
            expect(cohousing.foodList[1].name).to.equal(foodItem_2)
            expect(cohousing.foodList[1].weight).to.equal(0.5)
            expect(cohousing.foodList).to.exist
            expect(cohousing.foodList[0].name).to.equal(foodItem)
            expect(cohousing.foodList[0].weight).to.equal(0.5)
        })
    })

    describe('when you add a fruit that already exist in food list', () => {

        beforeEach(async () => {
            await addFood(foodItem)
        })

        it('should success on add new food item', async () => {

            await addFood(foodItem)
            const cohousing = await Cohousing.findOne({ members: userId })
            const user = await User.findById(userId)
            expect(user.foodList).to.exist
            expect(user.foodList[0].name).to.equal(foodItem)
            expect(user.foodList[0].weight).to.equal(1)
            expect(cohousing.foodList).to.exist
            expect(cohousing.foodList[0].name).to.equal(foodItem)
            expect(cohousing.foodList[0].weight).to.equal(1)
        })
        it('should success on add new food item and list already has one more fruit', async () => {

            await addFood(foodItem_2)
            const cohousing = await Cohousing.findOne({ members: userId })
            const user = await User.findById(userId)
            expect(user.foodList).to.exist
            expect(user.foodList[0].name).to.equal(foodItem)
            expect(user.foodList[0].weight).to.equal(0.5)
            expect(user.foodList[1].name).to.equal(foodItem_2)
            expect(user.foodList[1].weight).to.equal(0.5)
            expect(cohousing.foodList).to.exist
            expect(cohousing.foodList[0].name).to.equal(foodItem)
            expect(cohousing.foodList[0].weight).to.equal(0.5)
            expect(cohousing.foodList[1].name).to.equal(foodItem_2)
            expect(cohousing.foodList[1].weight).to.equal(0.5)
        })
    })

    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => addFood(true)).to.throw(TypeError, 'true is not a string')
            
        })
    })
    
    
    afterEach(() => User.deleteMany())
    
    after(mongoose.disconnect)
    
})