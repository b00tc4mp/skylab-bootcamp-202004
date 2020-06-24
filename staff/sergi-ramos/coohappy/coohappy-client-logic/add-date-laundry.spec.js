require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, API_URL, JWT_SECRET } } = process

const { expect } = require('chai')
const { random } = Math
const addDateLaundry = require('./add-date-laundry')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { models: { User, Cohousing }, mongoose: { ObjectId } } = require('coohappy-data')

const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')

logic.__context__.API_URL = API_URL
logic.__context__.storage = notAsyncStorage

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, message, date,
 _name, _surname, _email, _password, _hash, laundryNum, token

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
        token = await jwtPromised.sign({ sub: userId }, JWT_SECRET)
        await logic.__context__.storage.setItem('TOKEN',token);
    })

    describe('when not exist any reservations', () => {

        it('should succes on reservation', async () => {

            await addDateLaundry('8', '8')
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
                expect(error.message).to.equal(`You already have a reservation, can only do one`)
            }
        })

    })


    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => addDateLaundry(8, undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => addDateLaundry('', '8')).to.throw(VoidError, 'Some field is empty or blank')

        })
    })


    afterEach(() => {
        User.deleteMany()
        Cohousing.deleteMany()
    })

    after(mongoose.disconnect)

})