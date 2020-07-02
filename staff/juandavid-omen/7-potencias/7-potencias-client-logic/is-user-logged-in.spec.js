/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process

const isUserLoggedIn = require('./is-user-logged-in')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logic - isUserLoggedIn', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password

  beforeEach(() =>
    User.deleteMany()
      .then(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        return User.create({ name, surname, email, password })
          .then(user => userId = user.id)
          .then(_token => context.storage.token = _token)
      })
  )
  it('should return true when user is logged in', () => {
    const result = isUserLoggedIn()
    expect(result).to.be.true
  })

  it('should return false if the user is not logged in,', () => {
    context.storage.token = undefined

    const result = isUserLoggedIn()
    expect(result).to.equal(false)
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
