/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const updateCart = require('./update-cart')
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

describe('updateCart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let productId, quantity, name, surname, email, password

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
    productId = newLesson._id.toString()

    const productSelection = new ProductSelection({ product: newLesson, quantity: 1 })

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`

    const user = await User.create({ name, surname, email, password, cart: [productSelection] })

    context.storage.token = await jwtPromised.sign({ sub: user.id }, SECRET)
  })

  describe('when user already exists', () => {
    it('should succeed on correct user id', async () => {
      const quantity = 2
      const cart = await updateCart(productId, quantity)
      expect(cart).to.be.an('array').of.length(1)
      const [productSelection] = cart
      expect(productSelection.product._id.toString()).to.equal(productId)
      expect(productSelection.quantity).to.be.equal(quantity)
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
        await updateCart(productId, quantity)
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
