require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const createFamilyList = require('./create-family-list')
const { random } = Math
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
const { mongoose, models: { User } } = require('termometro-data')
require('termometro-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('termometro-commons')
const context = require('./context')
const bcrypt = require('bcryptjs')

context.API_URL = API_URL

describe('logic - retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, hash, age, sex, location, mood, token
    let genderArray = ['M', 'F']

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                age = Math.floor(Math.random() * 100);
                sex = genderArray[Math.floor(genderArray.length * Math.random())];
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                mood = {
                    date: Date.now(),
                    score: Math.floor(Math.random() * 10)
                }
                location = 'Barcelona'

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('should create a family list for the ADMIN with 0 members', () => {
        beforeEach(() =>
            User.create({ name, surname, age, sex, location, email, password })
                .then(user => jwtPromised.sign({ sub: user.id }, SECRET))
                .then(_token => token = _token)

        )

        it('if ADMIN has 0 members', () =>
            createFamilyList(token)
                .then(members => {
                    expect(members.length).to.equal(0)
                })
        )

    })

    describe('should create a family list for the ADMIN with members', () => {
        beforeEach(async () => {
            const admin = await User.create({ name, surname, age, sex, location, email, password })
            const _token = await jwtPromised.sign({ sub: admin.id }, SECRET)
            token = _token

            name = `name-${random()}`
            surname = `surname-${random()}`
            age = Math.floor(Math.random() * 100);
            sex = genderArray[Math.floor(genderArray.length * Math.random())];
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            mood = {
                date: Date.now(),
                score: Math.floor(Math.random() * 10)
            }
            location = 'Barcelona'

            const member = await User.create({ name, surname, age, sex, location, email, password, admin: admin.id })

            admin.members.push(member.id)
            await admin.save()

            return bcrypt.hash(password, 10)

        })

        it('if ADMIN has members', async () => {
            const members = await createFamilyList(token)
            const _member = await User.findOne({email: email})

            expect(members.length).to.equal(1)
            expect(members[0].id).to.equal(_member.id)

        })

    })

    describe('should RETURN the ADMIN of the member', () => {
        let member;

        beforeEach(async () => {
            const admin = await User.create({ name, surname, age, sex, location, email, password })
            

            name = `name-${random()}`
            surname = `surname-${random()}`
            age = Math.floor(Math.random() * 100);
            sex = genderArray[Math.floor(genderArray.length * Math.random())];
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            mood = {
                date: Date.now(),
                score: Math.floor(Math.random() * 10)
            }
            location = 'Barcelona'

            member = await User.create({ name, surname, age, sex, location, email, password, admin: admin.id })
            const _token = await jwtPromised.sign({ sub: member.id }, SECRET)
            token = _token

            admin.members.push(member.id)
            await admin.save()

            return bcrypt.hash(password, 10)

        })

        it('should succes on finding members admin', async () => {
            const adminInfo = await createFamilyList(token)

            expect(adminInfo.members[0]).to.equal(member.id)

        })

    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'

            return jwtPromised.sign({ sub: userId }, SECRET)
                .then(_token => token = _token)
        })

        it('should fail when user does not exist', () =>
            createFamilyList(token)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        )
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})