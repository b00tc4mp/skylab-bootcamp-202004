require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
const { random } = Math
const updateCohousing = require('./update-cohousing')
const bcrypt = require('bcryptjs')
const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose, models: { User, Cohousing } } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')

let name, surname, email, password, hash, userId, nameCohousing, street, number, city, accessCode, newNameCohousing

describe('logic - udpate-cohousing', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        nameCohousing = `name-${random()}`
        street = `street-${random()}`
        number = random()
        city = `city-${random()}`
        accessCode = randomAccessCode(name)

        newNameCohousing = `name-${random()}`

        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id
        let address = { street, number, city }
        await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId] })
    })

    describe('when cohousing exist', () => {

        it('should success changes on valid data, name change', async () => {

            await updateCohousing(userId, { name: newNameCohousing })
            const cohousing = await Cohousing.findOne({ members: userId })
            expect(cohousing.name).to.equal(newNameCohousing)
            expect(cohousing.address).to.be.an('object')
            expect(cohousing.address.street).to.equal(street)
            expect(cohousing.address.number).to.equal(number)
            expect(cohousing.address.city).to.equal(city)
        })

        it('should fail on unexistent userId', async () => {

            await User.deleteMany()

            try {
                await updateCohousing(userId, { name: newNameCohousing })

            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${userId} does not exist`)
            }
        })
    })

    describe('when new data is empty or blank', () => {

        it('should do not apply any changes when one field is blank', async () => {

            const blankString = ''

            try {
                await updateCohousing(userId, { name: blankString })

            } catch (error) {

                const cohousing = await Cohousing.findOne({ members: userId })
                expect(error).to.exist
                expect(error.message).to.equal(`string is empty or blank`)
                expect(cohousing.name).to.equal(nameCohousing)
                expect(cohousing.address).to.be.an('object')
                expect(cohousing.address.street).to.equal(street)
                expect(cohousing.address.number).to.equal(number)
                expect(cohousing.address.city).to.equal(city)
            }
        })
    })

    describe('sync errors', () => {

        it('on wrong type ofe data', () => {

            expect(() => updateCohousing(userId, true )).to.throw(TypeError, 'true is not an object')
            expect(() => updateCohousing(true, {name: 'hola'})).to.throw(TypeError, 'true is not a string')
        })
    })



    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})