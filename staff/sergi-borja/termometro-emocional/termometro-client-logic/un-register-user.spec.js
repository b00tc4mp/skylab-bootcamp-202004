require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
const { mongoose, models: { User } } = require('termometro-data')
require('termometro-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('termometro-commons')
const context = require('./context')
const bcrypt = require('bcryptjs')
const unRegisterUser = require('./un-register-user')

context.API_URL = API_URL

describe('logic - unRegister users and members', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, hash, age, sex, location, token, userId, _userId
    let genderArray = ['M', 'F']

    beforeEach(async () => {
        await User.deleteMany()
        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        location = 'Barcelona'

        hash = await bcrypt.hash(password, 10)
        admin = await User.create({ name, surname, age, sex, location, email, password: hash })
        userId = admin.id.toString();
        token = await jwtPromised.sign({ sub: admin.id }, SECRET)

        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        location = 'Barcelona'

        member = await User.create({ name, surname, age, sex, location, email, password, admin: admin.id })
        memberId = member.id
        admin.members.push(memberId)
        await admin.save()
    })

    it('should succeed unRegistering a members account', async () => {
        
        token = undefined
        
        await unRegisterUser(memberId, token)
        admin = await User.findById(userId)
        let _member = await User.findById(memberId)

        expect(admin.members.length).to.equal(0)
        expect(_member).to.be.null

    })

    it('should succeed unRegistering your own Account', async () => {
        
        await unRegisterUser(_userId, token)

        const user = await User.findById(userId)

        expect(user).to.be.null

    })

    describe('when user does not exist', () => {
        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'
            return jwtPromised.sign({ sub: userId }, SECRET)
                .then(_token => token = _token)
        })

        it('should fail when user does not exist', () =>
            unRegisterUser(userId, token)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('Cannot read property \'admin\' of null')
                })
        )
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)

})