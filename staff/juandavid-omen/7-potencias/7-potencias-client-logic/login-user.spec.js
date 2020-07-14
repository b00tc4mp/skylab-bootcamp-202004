/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process

const loginUser = require('./login-user')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User } } = require('7-potencias-data')
const bcrypt = require('bcryptjs')
require('7-potencias-commons/ponyfills/xhr')
require('7-potencias-commons/ponyfills/atob')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('loginUser', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, userId, hash

  beforeEach(async () => {
    await User.deleteMany()

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

    hash = await bcrypt.hash(password, 10)
  })

  describe('when user already exists', () => {
    beforeEach(async () => {
      const user = await User.create({ name, surname, email, password: hash })
      userId = user.id
    })

    it('should succeed on correct credentials', async () => {
      await loginUser(email, password)
      const token = context.storage.token
      const [, payloadBase64] = token.split('.')

      const payloadJson = atob(payloadBase64)

      const payload = JSON.parse(payloadJson)

      const { sub: _userId } = payload

      expect(_userId).to.equal(userId)
    })

    it('should fail on wrong password', async () => {
      password += 'wrong-'
      try {
        await loginUser(email, password)
      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('wrong password')
      }
    })
  })

  it('should fail when user does not exist', async () => {
    try {
      await loginUser(email, password)
    } catch (error) {
      expect(error).to.be.an.instanceof(Error)
      expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
    }
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
