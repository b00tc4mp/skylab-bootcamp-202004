require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User } } = require('7-potencias-data')
const { errors: { UnexistenceError} } = require('7-potencias-commons')

describe('logic - retrieve user', () => {
  let users

  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, userId

  beforeEach(async () => {
    await User.deleteMany()

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

  })

  describe('when user already exists', () => {
    beforeEach(async () => {
      const user = { name, surname, email, password }

      const newUser = await User.create(user)
      userId = newUser.id
    })

    it('should succeed on correct user id', async () => {
      const user = await retrieveUser(userId)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.be.undefined
    })

    it('should fail when user does not exist', async () => {
    const userId = '5ed1204ee99ccf6fae798aef'
    let error
    try {
      await retrieveUser(userId)
    } catch (err) {
      error = err
    }

    expect(error).to.exist
    expect(error).to.be.an.instanceof(UnexistenceError)
    expect(error.message).to.equal(`user with id ${userId} does not exist`)

    })

    afterEach(() => User.deleteMany())

    after(async() => {
    await User.deleteMany()
    mongoose.disconnect
    })
  })
})