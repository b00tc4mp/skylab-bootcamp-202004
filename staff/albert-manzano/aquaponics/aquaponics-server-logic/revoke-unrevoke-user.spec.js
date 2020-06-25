require('dotenv').config

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')
const revokeUnrevokeUser = require('./revoke-unrevoke-user.js')

describe('logic - revoke-unrevoke', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, role, phone
    let userId

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'user'
                phone = random()
                status = 'enable'
            })
    )

    describe('when user exist', () => {
        beforeEach(() => {
            let user = { name, surname, email, password, role, phone }

            return User.create(user)
                .then(result => userId = result.id)
        })

        it('should change from enable to disable status', async () => {
            await revokeUnrevokeUser(userId)
            let user = await User.find()
            expect(user.status).to.equal("disable")
            revokeUnrevokeUser(userId)
            user = await User.find()
            expect(user.status).to.equal("enable")
                
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            revokeUnrevokeUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            revokeUnrevokeUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            revokeUnrevokeUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'
        return revokeUnrevokeUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with ${userId} does not exist`)
            })
    })
    afterEach(async () => await User.deleteMany())

    after(async () => await mongoose.disconnect)
})