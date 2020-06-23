require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random, trunc } = Math
const deleteDateLaundry = require('./delete-date-laundry')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')
const { models: { User, Cohousing }, mongoose: { ObjectId } } = require('coohappy-data')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, _name, _surname, _email, _password, _hash, laundryNum, day, hour

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

            const _cohousing = await Cohousing.findOne({ 'members': userId })

            expect(_cohousing.laundry).to.exist
            expect(_cohousing.laundry[0].day).to.equal(day)
            expect(_cohousing.laundry[0].hour).to.equal(hour)
            expect(_cohousing.laundry[0].user.toString()).to.equal(userId)

            await deleteDateLaundry(userId)
            const cohousing = await Cohousing.findOne({ 'members': userId })

            expect(cohousing.laundry.length).to.equal.toString(0)
        })
    })

    describe('when not exist any reservations', () => {

        it('should fail on delete reservation', async () => {

            await Cohousing.findOneAndUpdate({ 'members': userId }, { $pull: { laundry: { user: userId } } })

            const _cohousing = await Cohousing.findOne({ 'members': userId })

            try {

                await deleteDateLaundry(userId)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${userId} has not an hour in the laundry yet`)
            }
        })

        it('should fail when cohousing has not user like a member', async () => {
            const _userId = '5ee27acef627c0036934feb5'
            try {

                await deleteDateLaundry(_userId)

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`There is no cohousing with a user with an id ${_userId}`)
            }

        })
    })

    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => deleteDateLaundry('')).to.throw(VoidError, 'Some field is empty or blank')
            expect(() => deleteDateLaundry(true)).to.throw(TypeError, 'true is not a string')

        })
    })

    afterEach(async () => {
        await Promise.all([User.deleteMany(),
        Cohousing.deleteMany()])
    })

    after(mongoose.disconnect)

})