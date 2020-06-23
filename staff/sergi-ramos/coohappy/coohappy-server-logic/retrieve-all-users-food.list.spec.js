require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random } = Math
const retrieveAllUserFoodList = require('./retrieve-allUsers-food-list')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { models: { User, Cohousing }, mongoose: { ObjectId } } = require('coohappy-data')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode,
foodItem, foodItem_2, _name, _surname, _email, _password, _hash, _nameCohousing, _street, _number, _city, _accessCode, laundryNum

describe('logic - retrieve-all-user-food-list', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()
        await Cohousing.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        _name = `name-${random()}`
        _surname = `surname-${random()}`
        _email = `e-${random()}@mail.com`
        _password = `password-${random()}`

        nameCohousing = `name-${random()}`
        street = `street-${random()}`
        number = random()
        city = `city-${random()}`
        accessCode = randomAccessCode(name)
        laundryNum = 4
        
        _nameCohousing = `name-${random()}`
        _street = `street-${random()}`
        _number = random()
        _city = `city-${random()}`
        _accessCode = randomAccessCode(name)

        foodItem = `fruit-${random()}`
        foodItem_2 = `fruit-${random()}`


        hash = await bcrypt.hash(password, 10)
        _hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        let address = { street, number, city }
        const cohousing = await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })

        cohousing.foodList.push({ name: foodItem, weight: 2 })
        cohousing.foodList.push({ name: foodItem_2, weight: 1 })
        await cohousing.save()
    })

    describe('when cohousing have a list', () => {

        it('should show user list food', async () => {

            const list = await retrieveAllUserFoodList(userId)

            expect(list.foodList).to.exist
            expect(list.foodList[0].name).to.equal(foodItem)
            expect(list.foodList[0].weight).to.equal(2)

            expect(list.foodList[1].name).to.equal(foodItem_2)
            expect(list.foodList[1].weight).to.equal(1)
        })
    })


    describe('when cohousing has not a list', () => {
        let _user, _userId
        let address = { _street, _number, _city }
        beforeEach(async () => {
            _user = await User.create({name: _name,surname:  _surname, email: _email, password: _hash })
            _userId = _user.id
            await Cohousing.create({ name: _nameCohousing, address, author: _userId, accessCode: _accessCode, members: [_userId], laundryNum: 4 })
        })
        it('should not show nothing', async () => {
            try {

                await retrieveAllUserFoodList(_userId)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`no list yet`)
            }
        })
    })


    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => retrieveAllUserFoodList('')).to.throw(VoidError, 'Some field is empty or blank')
            expect(() => retrieveAllUserFoodList(2)).to.throw(TypeError, '2 is not a string')
        })
    })


    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)

})