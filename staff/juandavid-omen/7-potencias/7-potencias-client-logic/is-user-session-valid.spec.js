/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const isUserSessionValid = require('./is-user-session-valid')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('7-potencias-data')
const { utils: { jwtPromised } } = require('7-potencias-commons')
require('7-potencias-commons/ponyfills/xhr')
require('7-potencias-commons/ponyfills/atob')
const context = require('./context')
const { ObjectId } = require('7-potencias-data/mongo')

context.API_URL = API_URL
context.storage = {}

describe('isUserSessionValid', () => {
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

  it('Should succeed when user authenticates and token does not expire', async () => {
    const result = await isUserSessionValid()
    expect(result).to.equal(true)
  })

  it('Should fail when the token is not valid', async () => {
    const _userId = ObjectId().toString()
    context.storage.token = await jwtPromised.sign({ sub: _userId }, SECRET)
    const result = await isUserSessionValid()
    expect(result).to.equal(false)
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
