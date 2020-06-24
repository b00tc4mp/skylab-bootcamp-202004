require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET } } = process

const { expect } = require('chai')
const { random } = Math
const joinToCohousing = require('./join-community')
const bcrypt = require('bcryptjs')

const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')

const { utils: { randomAccessCode } } = require('coohappy-commons')
const { mongoose } = require('coohappy-data')
const { models: { User, Cohousing } } = require('coohappy-data')
const { errors: { VoidError } } = require('coohappy-commons')

let name, surname, email, password, hash, userId, nameCohousing, cohousingId, street, number, city, accessCode, message, date, laundryNum

describe('logic - join-community', () => {

    before(() => mongoose.connect(MONGODB_URL))

    beforeEach(async () => {

        await User.deleteMany()
        await Cohousing.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        name_2 = `name-${random()}`
        surname_2 = `surname-${random()}`
        email_2 = `e-${random()}@mail.com`
        password_2 = `password-${random()}`

        nameCohousing = `name-${random()}`
        street = `street-${random()}`
        number = random()
        city = `city-${random()}`
        accessCode = randomAccessCode(name)
        laundryNum = 4

        hash = await bcrypt.hash(password, 10)
        hash_2 = await bcrypt.hash(password_2, 10)
        const user = await User.create({ name, surname, email, password: hash })
        const user_2 = await User.create({ name: name_2, surname: surname_2, email: email_2, password: hash_2 })
        userId = user.id
        userId_2 = user_2.id
        const token = await jwtPromised.sign({ sub: userId }, JWT_SECRET)
        await logic.__context__.storage.setItem('TOKEN', token)

        let address = { street, number, city }
        const { id } = await Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId], laundryNum })
        cohousingId = id
    })


    describe('when user does not exist like member of cohousing', () => {

        it('should success on join to cohousing', async () => {
       
            const token = await jwtPromised.sign({ sub: userId_2 }, JWT_SECRET)
            await logic.__context__.storage.setItem('TOKEN', token)

            await joinToCohousing(accessCode)
            const cohousing = await Cohousing.findById(cohousingId)
            expect(cohousing).to.exist
            expect(cohousing.members[1].toString()).to.equal(userId_2)

        })
        it('it should fail when user id does not exist', async () => {
            const fakeId = '5ee0ef7e545db7766c02e5cf'
            const token = await jwtPromised.sign({ sub: fakeId }, JWT_SECRET)
            await logic.__context__.storage.setItem('TOKEN', token)

            try {
                await joinToCohousing(accessCode)
            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${fakeId} does not exist`)
            }
        })

        it('it shoul fail when accessCode is wrong', async () => {
            const fakeAccessCode = 'no_valid_id'
            const token = await jwtPromised.sign({ sub: userId_2 }, JWT_SECRET)
            await logic.__context__.storage.setItem('TOKEN', token)


            try {
                await joinToCohousing(fakeAccessCode)
            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal(`cohousing with access code ${fakeAccessCode} does not exist `)
            }
        })
    })

    describe('when user does exist like member of cohousing', () => {

        it('it should fail when user already belongs to a cohousing`', async () => {

            try {
                await joinToCohousing(accessCode)
            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${userId} already belongs to a cohousing`)
            }
        })
    })


    describe('sync errors', () => {

        it('on wrong type of data', () => {

            expect(() => joinToCohousing(undefined)).to.throw(TypeError, 'undefined is not a string')
        })
    })

    afterEach(async () => await Promise.all([User.deleteMany(), Cohousing.deleteMany()]))
    after(mongoose.disconnect)
})