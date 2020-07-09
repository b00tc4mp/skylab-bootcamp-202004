/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const deleteCart = require('./delete-cart')
require('7-potencias-commons/polyfills/math')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User, Lesson, ProductSelection } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('7-potencias-commons')
const context = require('./context')
const { ObjectId } = require('7-potencias-data/mongo')

context.API_URL = API_URL
context.storage = {}

describe('deleteCart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let userId, name, surname, email, password

  beforeEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()

    const lesson = {
      name: `name-${random()}`,
      price: random() * 1000,
      style: `style-${random()}`,
      hour: random() * 24,
      minute: random() * 60,
      day: random() * 7,
      month: random() * 12,
      year: random() * 2000
    }

    const newLesson = await Lesson.create(lesson)

    const productSelection = new ProductSelection({ product: newLesson, quantity: 1 })

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

    const user = await User.create({ name, surname, email, password, cart: [productSelection] })
    userId = user.id
    context.storage.token = await jwtPromised.sign({ sub: user.id }, SECRET)
  })

  describe('when user already exists', () => {
    it('should succeed on correct user id', async () => {
      await deleteCart()
      const user = await User.findById(userId)
      const { cart } = user
      expect(cart).to.be.an('array').of.length(0)
    })
  })

  describe('when user does not exist', () => {
    let userId

    beforeEach(async () => {
      userId = ObjectId().toString()

      context.storage.token = await jwtPromised.sign({ sub: userId }, SECRET)
    })

    it('should fail when user does not exist', async () => {
      try {
        await deleteCart()
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal(`user with id ${userId} does not exist`)
      }
    })
  })

  afterEach(() => User.deleteMany()
    .then(() => Lesson.deleteMany))

  after(mongoose.disconnect)
})
