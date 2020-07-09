/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('7-potencias-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe(' retrieveUser', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password

  beforeEach(async () => {
    await User.deleteMany()
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`
  })

  describe('when user already exists', () => {
    beforeEach(async () => {
      const user = await User.create({ name, surname, email, password })
      context.storage.token = await jwtPromised.sign({ sub: user.id }, SECRET)
    })

    it('should succeed on correct user id', async () => {
      const user = await retrieveUser()
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.be.undefined
    })
  })

  describe('when user does not exist', () => {
    let userId

    beforeEach(async () => {
      userId = '5ed1204ee99ccf6fae798aef'

      context.storage.token = await jwtPromised.sign({ sub: userId }, SECRET)
    })

    it('should fail when user does not exist', async () => {
      try {
        await retrieveUser()
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal(`user with id ${userId} does not exist`)
      }
    })
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
