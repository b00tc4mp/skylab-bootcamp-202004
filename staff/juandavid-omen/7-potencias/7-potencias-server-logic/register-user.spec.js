/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User } } = require('7-potencias-data')
const bcrypt = require('bcryptjs')
const { VoidError } = require('7-potencias-commons/errors')

describe('logic - register user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password

  beforeEach(async () => {
    await User.deleteMany()

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`
  })

  it('should fail when name is empty', () => {
    name = ''
    expect(() => registerUser(name, surname, email, password)).to.throw(VoidError, 'string is empty or blank')
  })

  it('should fail when surname is empty', () => {
    surname = ''
    expect(() => registerUser(name, surname, email, password)).to.throw(VoidError, 'string is empty or blank')
  })

  it('should fail when email is empty', () => {
    email = ''
    expect(() => registerUser(name, surname, email, password)).to.throw(VoidError, 'string is empty or blank')
  })

  it('should fail when email is not valid', () => {
    email = '12123.com'
    expect(() => registerUser(name, surname, email, password)).to.throw(Error, '12123.com is not an e-mail')

    email = '12123@com'
    expect(() => registerUser(name, surname, email, password)).to.throw(Error, '12123@com is not an e-mail')
  })

  it('should fail when password is empty', () => {
    password = ''
    expect(() => registerUser(name, surname, email, password)).to.throw(VoidError, 'string is empty or blank')
  })

  it('should fail when password has less than 8 characters', () => {
    password = '1234567'
    expect(() => registerUser(name, surname, email, password)).to.throw(Error, '"1234567" length is not greater or equal than 8')
  })

  it('should succeed on valid data', async () => {
    const result = await registerUser(name, surname, email, password)

    expect(result).to.be.undefined

    const users = await User.find()

    expect(users.length).to.equal(1)

    const [user] = users

    expect(user.name).to.equal(name)
    expect(user.surname).to.equal(surname)
    expect(user.email).to.equal(email)
    expect(user.created).to.be.instanceOf(Date)
    expect(user.role).to.equal('regular')
    expect(user.cart).to.be.instanceOf(Array)
    expect(user.orders).to.be.instanceOf(Array)

    const match = await bcrypt.compare(password, user.password)
    expect(match).to.be.true
  })

  describe('when user already exists', () => {
    beforeEach(() => User.create({ name, surname, email, password }))

    it('should fail on trying to register an existing user', async () => {
      try {
        await registerUser(name, surname, email, password)

        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist

        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal(`user with e-mail ${email} already exists`)
      }
    })
  })

  afterEach(() => User.deleteMany())

  after(mongoose.disconnect)
})
