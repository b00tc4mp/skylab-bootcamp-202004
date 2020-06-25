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

describe('login user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, userId, hash

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

  describe('when user already exists', () => {
    beforeEach(() =>
      User.create({ name, surname, email, password: hash })
        .then(user => userId = user.id)
    )

    it('should succeed on correct credentials', () => {
      loginUser(email, password)
        .then(token => {
          const [, payloadBase64] = token.split('.')

          const payloadJson = atob(payloadBase64)

          const payload = JSON.parse(payloadJson)

          const { sub: _userId } = payload

          expect(_userId).to.equal(userId)
        })
    })

    it('should fail on wrong password', () => {
      password += 'wrong-'

      loginUser(email, password)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
          expect(error).to.be.an.instanceof(Error)
          expect(error.message).to.equal('wrong password')
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
