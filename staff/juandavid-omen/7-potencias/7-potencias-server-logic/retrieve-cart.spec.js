/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveCart = require('./retrieve-cart')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User, Lesson, ProductSelection } } = require('7-potencias-data')
const { errors: { UnexistenceError } } = require('7-potencias-commons')

describe('logic - retrieve user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, userId, productId, quantity

  beforeEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()

    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `e-${random()}@mail.com`
    password = `password-${random()}`
  })

  describe('when user already exists', () => {
    beforeEach(async () => {

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

      quantity = 1
      const productSelection = new ProductSelection({ product: newLesson, quantity: quantity })

      const newUser = await User.create({ name, surname, email, password, cart: [productSelection] })

      userId = newUser.id
    })

    it('should succeed on correct user id', async () => {
      const cart = await retrieveCart(userId)
      expect(cart).to.be.an('array').of.length(1)

      const [productSelection] = cart
      expect(productSelection.product._id.toString()).to.equal(productId)
      expect(productSelection.quantity).to.be.equal(quantity)
    })

    it('should fail when user does not exist', async () => {
      const userId = '5ed1204ee99ccf6fae798aef'
      let error
      try {
        await retrieveCart(userId)
      } catch (err) {
        error = err
      }

      expect(error).to.exist
      expect(error).to.be.an.instanceof(UnexistenceError)
      expect(error.message).to.equal(`user with id ${userId} does not exist`)
    })

    afterEach(() => User.deleteMany())

    after(async () => {
      await User.deleteMany()
      mongoose.disconnect
    })
  })
})
