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
const setMood = require('./set-mood')

context.API_URL = API_URL

describe('logic - set-mood', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, hash, age, sex, location, mood, token, moodScore, userId;
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
        moodScore = Math.floor(Math.random() * 10)

        hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, age, sex, location, email, password: hash })
        userId = user.id.toString();
        token = await jwtPromised.sign({ sub: user.id }, SECRET)
    })

    it('should succeed on setting mood', async () => {
        let user = await User.findById(userId)
        await setMood(token, moodScore)

        user = await User.findById(userId)
        expect(user.name).to.equal(name)

        expect(user.mood[0].score).to.equal(moodScore)

    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'

            return jwtPromised.sign({ sub: userId }, SECRET)
                .then(_token => token = _token)
        })

        it('should fail when user does not exist', () =>
            setMood(token, moodScore)
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