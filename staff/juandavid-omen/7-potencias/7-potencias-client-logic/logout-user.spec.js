/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const logoutUser = require('./logout-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('7-potencias-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logoutUser', () => {
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

  it('should remove the token', async () => {
    await logoutUser()
    expect(context.storage.token).to.be.undefined
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
