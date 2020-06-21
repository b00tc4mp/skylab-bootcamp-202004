/* eslint-env mocha */

require('dotenv').config()
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/math')

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const deleteCart = require('./delete-cart')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Lesson } } = require('7-potencias-data')
const { errors: { UnexistenceError, VoidError } } = require('7-potencias-commons')
const { ObjectId } = require('7-potencias-data/mongo')

describe('Delete cart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let userId, productId

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
    productId = await Lesson.create(lesson)

    const productSelection = {
      product: productId,
      quantity: random() * 5
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

  it('should delete cart on existing user', async () => {
    await deleteCart(userId)

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart } = user

    expect(cart).to.exist

    expect(cart).to.have.lengthOf(0)
  })

  it('should fail on trying to remove a whole cart when user  not exist', async () => {
    let error

    userId = new ObjectId().toString()

    try {
      await deleteCart(userId)
    } catch (err) {
      error = err
    }

    expect(error).to.exist
    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`user with id ${userId} does not exist`)
  })

  it('should fail on trying to remove a whole cart with user id empty', async () => {
    let error

    userId = ''

    try {
      await deleteCart(userId)
    } catch (err) {
      error = err
    }

    expect(error).to.exist
    expect(error).to.be.instanceOf(VoidError)
    expect(error.message).to.equal('string is empty or blank')
  })
  //   when void

  afterEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()
  })

  after(() => mongoose.disconnect())
})
