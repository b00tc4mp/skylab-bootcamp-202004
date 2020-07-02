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

describe(' retrieve user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password

  beforeEach((done) => {
    User.deleteMany()
      .then(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
      }).then(done())
  }
  )

  describe('when user already exists', () => {
    beforeEach((done) =>
      User.create({ name, surname, email, password })
        .then(user => jwtPromised.sign({ sub: user.id }, SECRET))
        .then(token => context.storage.token = token)
        .then(done())
    )

    it('should succeed on correct user id', done =>
      retrieveUser()
        .then(user => {
          expect(user.name).to.equal(name)
          expect(user.surname).to.equal(surname)
          expect(user.email).to.equal(email)
          expect(user.password).to.be.undefined
        })
        .then(done())
    )
  })

  describe('when user does not exist', () => {
    let userId

    beforeEach(() => {
      userId = '5ed1204ee99ccf6fae798aef'

      return jwtPromised.sign({ sub: userId }, SECRET)
        .then(token => context.storage.token = token)
    })

    it('should fail when user does not exist', () =>
      retrieveUser()
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
