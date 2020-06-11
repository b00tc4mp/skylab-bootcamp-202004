require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random } = Math
const addDateLaundry = require('./add-date-laundry')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { models: { User, Cohousing }, mongoose: { ObjectId } } = require('coohappy-data')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, message, date,
    foodItem, foodItem_2, _name, _surname, _email, _password, _hash, _nameCohousing, _street, _number, _city, _accessCode, laundryNum

describe('logic - add-date-laundry', () => {

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
        laundryNum = 1


        hash = await bcrypt.hash(password, 10)
        _hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        _user = await User.create({ name: _name, surname: _surname, email: _email, password: _hash })
        _userId = _user.id
        let address = { street, number, city }
        const cohousing = await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })

    })

    describe('when not exist any reservations', () => {

        it('should succes on reservation', async () => {

            await addDateLaundry('8', '8', userId)
            const cohousing = await Cohousing.findOne({ 'members': userId })

            expect(cohousing.laundry).to.exist
            expect(cohousing.laundry[0].day).to.equal('8')
            expect(cohousing.laundry[0].hour).to.equal('8')
            expect(cohousing.laundry[0].user.toString()).to.equal(userId)
        })
    })


    describe('when exist any reservations', () => {

        beforeEach(async () => {
            const cohousing = await Cohousing.findOne({ 'members': userId })
            cohousing.members.push(_userId)
            cohousing.save()
        })

        it('it should fail when there is a reservation and we want to do a second one at the same hour with a limit of 1 washing machines', async () => {

            await addDateLaundry('8', '8', userId)

            const cohousing = await Cohousing.findOne({ 'members': userId })

            expect(cohousing.laundry).to.exist
            expect(cohousing.laundry[0].day).to.equal('8')
            expect(cohousing.laundry[0].hour).to.equal('8')
            expect(cohousing.laundry[0].user.toString()).to.equal(userId)
            try {
                await addDateLaundry('8', '8', _userId)

            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal('sorry all the washing machines are full ')
            }
        })

        it('it should fail when there is a reservation and we want to do a second with the same user', async () => {

            const cohousing = await Cohousing.findOneAndUpdate({ 'members': userId }, { $set: { laundryNum: 4 } })

            await addDateLaundry('8', '8', userId)

            try {
                await addDateLaundry('8', '8', userId)

            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${userId} already have an hour in the laundry`)
            }
        })

        it('should success when there is a reservation and we want to do a second at the same hour and day with another user and the limit of washing machines are 2', async () => {

            await Cohousing.findOneAndUpdate({ 'members': userId }, { $set: { laundryNum: 2 } })

            await addDateLaundry('8', '8', userId)
            await addDateLaundry('8', '8', _userId)
            const cohousing =  await Cohousing.findOne({ 'members': userId })
            expect(cohousing.laundry).to.exist
            expect(cohousing.laundry[0].day).to.equal('8')
            expect(cohousing.laundry[0].hour).to.equal('8')
            expect(cohousing.laundry[0].user.toString()).to.equal(userId)

            expect(cohousing.laundry[1].day).to.equal('8')
            expect(cohousing.laundry[1].hour).to.equal('8')
            expect(cohousing.laundry[1].user.toString()).to.equal(_userId)
        })
    })


    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => addDateLaundry(undefined, undefined, userId)).to.throw(TypeError, 'undefined is not a string')
            expect(() => addDateLaundry('', '8', userId)).to.throw(VoidError, 'string is empty or blank')

        })
    })


    afterEach(() => {
        User.deleteMany()
        Cohousing.deleteMany()
    })

    after(mongoose.disconnect)

})