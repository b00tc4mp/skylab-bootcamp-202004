require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL,TEST_API_URL: API_URL , JWT_SECRET} } = process
const {utils: { jwtPromised }} = require('../work-meeting-commons')
const loginUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User } } = require('work-meeting-data')
const bcrypt = require('bcryptjs')
require('work-meeting-commons/ponyfills/xhr')
require('work-meeting-commons/ponyfills/atob')
const context = require('./context')

context.API_URL = API_URL 

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash,token

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when user already exists',() => {
        beforeEach(async() =>{
            
            let user = await User.create({ name, surname, email, password: hash })
            userId = user.id
            token = await jwtPromised.sign({sub:userId}, JWT_SECRET,{expiresIn: '1d'})
            context.storage= {token}
    })

        it('should succeed on correct credentials', () =>
            loginUser(email, password)
                .then(() => {
                    const { token } = context.storage

                    const [, payloadBase64] = token.split('.')

                    const payloadJson = atob(payloadBase64) //atob : descondifica el parametro, btoa: codifica el parametro

                    const payload = JSON.parse(payloadJson)

                    const { sub: _userId } = payload

                    expect(_userId).to.equal(userId)
                })
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return loginUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        loginUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    )

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})