/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const isUserLoggedIn = require('./is-user-logged-in')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('7-potencias-data')
const { utils: { jwtPromised } } = require('7-potencias-commons')
require('7-potencias-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('isUserLoggedIn', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password

  beforeEach(async () => {
    await User.deleteMany()

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

    const user = await User.create({ name, surname, email, password })
    context.storage.token = await jwtPromised.sign({ sub: user.id }, SECRET)
  })

  it('Should return true when the user is logged in', async () => {
    const result = await isUserLoggedIn()
    expect(result).to.be.true
  })

  it('Should return false when user is not logged in', async () => {
    context.storage.token = undefined

    const result = await isUserLoggedIn()
    expect(result).to.equal(false)
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
