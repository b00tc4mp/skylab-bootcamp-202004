require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User } } = require('7-potencias-data')
const { errors: { UnexistenceError, CredentialsError } } = require('7-potencias-commons')

const bcrypt = require('bcryptjs')

describe('logic - authenticate user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, userId, hash

  beforeEach(async () => {
    await User.deleteMany()
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

    hash = await bcrypt.hash(password, 8)
  })

  describe('when user already exists', () => {
    beforeEach(async () => {
      const user = await User.create({ name, surname, email, password: hash })
      userId = user.id
    })

    it('should succeed on correct credentials', async () => {
      const _userId = await authenticateUser(email, password)
      expect(_userId).to.equal(userId)
    })

    it('should fail on wrong password', async () => {
      password += 'wrong-'

      let error = null
      try {
        await authenticateUser(email, password)
      } catch (err) {
        error = err
      }

      expect(error).to.be.an.instanceof(CredentialsError)
      expect(error.message).to.equal('wrong password')
    })

    it('should fail when user does not exist', async () => {
      email = 'non-existing-email@gmail.com'
      let error = null
      try {
        await authenticateUser(email, password)
      } catch (err) {
        error = err
      }

      expect(error).to.be.an.instanceof(UnexistenceError)
      expect(error.message).to.equal(`user with e-mail ${email} does not exist`)

    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
  })
})
