/* eslint-env mocha */

require('dotenv').config()
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/math')
require('7-potencias-commons/polyfills/string')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const placeOrder = require('./place-order')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Lesson } } = require('7-potencias-data')
const { errors: { UnexistenceError, VoidError } } = require('7-potencias-commons')
const { ObjectId } = require('7-potencias-data/mongo')

describe('Place order', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let userId

  beforeEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()

    const lesson = {
      name: `name-${random()}`,
      price: 2,
      style: `style-${random()}`,
      hour: random() * 24,
      minute: random() * 60,
      day: random() * 7,
      month: random() * 12,
      year: random() * 2000
    }
    const productId = await Lesson.create(lesson)

    const productSelection = {
      product: productId,
      quantity: 3
    }

    const user = {
      name: `name-${random()}`,
      surname: `surname-${random()}`,
      email: `e-${random()}@mail.com`,
      password: `password-${random()}`,
      cart: [productSelection],
      orders: []
    }

    const newUser = await User.create(user)
    userId = newUser._id.toString()
  })
  it('should fail when user does not exist', async () => {
    let error
    userId = new ObjectId().toString()

    try {
      await placeOrder(userId)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal('user does not exists')
  })

  it('should fail when user id is empty', async () => {
    let error

    try {
      await placeOrder('')
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(VoidError)
    expect(error.message).to.equal('string is empty or blank')
  })

  it('should fail when the cart is empty', async () => {
    let error

    const user = {
      name: `name-${random()}`,
      surname: `surname-${random()}`,
      email: `e-${random()}@mail.com`,
      password: `password-${random()}`,
      cart: [],
      orders: []
    }

    const newUser = await User.create(user)
    userId = newUser._id.toString()

    try {
      await placeOrder(userId)
    } catch (err) {
      error = err
    }

    expect(error).to.be.an.instanceof(UnexistenceError)
    expect(error.message).to.equal('Cart is empty')
  })

  it('should succed on placing order', async () => {
    await placeOrder(userId)

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart, orders: [{ amount, productSelections }] } = user

    expect(amount).to.be.equal(6)
    expect(productSelections).to.be.an('array').to.lengthOf(1)
    expect(cart).to.be.an('array').to.be.empty
  })

  afterEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()
  })

  after(() => mongoose.disconnect())
})
