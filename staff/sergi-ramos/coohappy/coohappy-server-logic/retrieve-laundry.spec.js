require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random, trunc } = Math
const retrieveLaundry = require('./retrieve-laundry')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { models: { User, Cohousing }, mongoose: { ObjectId } } = require('coohappy-data')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, _name, _surname, _email, _password, _hash, laundryNum, day, hour

describe('logic - retrieve-laundry', () => {

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
        laundryNum = Math.trunc((random() * 10))

        day = trunc((random() * 10)).toString()
        hour = trunc((random() * 10)).toString()


        hash = await bcrypt.hash(password, 10)
        _hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        _user = await User.create({ name: _name, surname: _surname, email: _email, password: _hash })
        _userId = _user.id

        let address = { street, number, city }
        const cohousing = await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum, laundry: [{ day, hour, user: ObjectId(userId) }] })
    })

    describe('when exist any reservations', () => {

        it('should succes on delete reservation', async () => {

            const allLaundry = await retrieveLaundry(userId)
            expect(allLaundry.laundry).to.exist
            expect(allLaundry.laundryNum).to.exist
            expect(allLaundry.laundryNum).to.equal(laundryNum)
            expect(allLaundry.laundry[0].day).to.equal(day)
            expect(allLaundry.laundry[0].hour).to.equal(hour)

        })
    })

    describe('when not exist any reservations', () => {

        it('should fail on retrieve reservation', async () => {

            const cohousing = await Cohousing.findOneAndUpdate({ 'members': userId }, { $pull: { laundry: { user: userId } } })

            const allLaundry = await retrieveLaundry(userId)
            expect(allLaundry.laundry.length).to.equal(0)
            expect(allLaundry.laundryNum).to.exist
            expect(allLaundry.laundryNum).to.equal(laundryNum)
            expect(allLaundry.laundryNum).to.exist
        })
    })

    describe('when cohousing does not exist', () => {

        beforeEach(async () => {
            await Cohousing.deleteMany()
        })

        it('should fail on unnexistence cohousing', async () => {
            try {
                const allLaundry = await retrieveLaundry(userId)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.be.equal(`cohousing of user with id ${userId} does not exist`)
            }


        })
    })

    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => retrieveLaundry('')).to.throw(VoidError, 'Some field is empty or blank')
            expect(() => retrieveLaundry(true)).to.throw(TypeError, 'true is not a string')

        })
    })

    afterEach(async () => {
        await Promise.all([User.deleteMany(),
        Cohousing.deleteMany()])
    })

    after(mongoose.disconnect)

})