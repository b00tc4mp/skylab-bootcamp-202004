/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-cart')
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { mongoose, models: { User, Lesson } } = require('7-potencias-data')
const { errors: { UnexistenceError, ValueError } } = require('7-potencias-commons')
const { ObjectId } = require('7-potencias-data/mongo')
const { VoidError } = require('7-potencias-commons/errors')

describe('Update cart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let userId, productId, quantity

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

    const productSelection = {
      product: productId,
      quantity: randomIntegerBetween(1, 100)
    }

    const user = {
      name: `name-${random()}`,
      surname: `surname-${random()}`,
      email: `e-${random()}@mail.com`,
      password: `password-${random()}`,
      cart: [productSelection],
      orders: []
    }

    quantity = randomIntegerBetween(1, 100)

    const newUser = await User.create(user)
    userId = newUser._id.toString()
  })

  it('should modify product when quantity is higher than zero and is in the card', async () => {
    await updateCart(userId, productId, quantity)

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart } = user

    expect(cart).to.exist
    expect(cart).to.have.lengthOf(1)

    const [_productSelection] = cart

    expect(_productSelection).to.exist

    const { quantity: _quantity } = _productSelection

    expect(_productSelection.product._id.toString()).to.equal(productId)
    expect(_quantity).to.equal(quantity)
  })

  it('should delete product from the card when quantity is zero and product is in the card', async () => {
    quantity = 0
    await updateCart(userId, productId, quantity)

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart } = user

    expect(cart).to.exist
    expect(cart).to.be.an('array').that.is.empty
  })

  it('should add product when quantity is higher than zero and is not in the card', async () => {
    const newLesson = {
      name: `name-${random()}`,
      price: random() * 1000,
      style: `style-${random()}`,
      hour: random() * 24,
      minute: random() * 60,
      day: random() * 7,
      month: random() * 12,
      year: random() * 2000
    }

    const _lesson = await Lesson.create(newLesson)
    productId = _lesson._id.toString()
    quantity = 3

    const _user = await updateCart(userId, productId, quantity)
    expect(_user).to.exist

    const { cart } = _user

    expect(cart).to.exist
    expect(cart).to.have.lengthOf(2)

    const newProductSelection = cart[1]

    expect(newProductSelection).to.have.property('quantity', 3)
    expect(newProductSelection.product._id.toString()).to.be.equal(_lesson._id.toString())
  })

  it('should fail on trying to remove a product that is not already in cart', async () => {
    let error

    const newLesson = {
      name: `name-${random()}`,
      price: random() * 1000,
      style: `style-${random()}`,
      hour: random() * 24,
      minute: random() * 60,
      day: random() * 7,
      month: random() * 12,
      year: random() * 2000
    }

    const _lesson = await Lesson.create(newLesson)
    productId = _lesson._id.toString()
    quantity = 0

    try {
      await updateCart(userId, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`product selection with id ${productId} does not exist in cart for user with id ${userId}`)
  })

  it('should fail when product with productId does not exist', async () => {
    let error
    productId = new ObjectId().toString()
    quantity = 0

    try {
      await updateCart(userId, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`product with id ${productId} does not exist`)
  })

  it('should fail when product id is not string', async () => {
    let error

    try {
      await updateCart(userId, true, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('true is not a string')

    try {
      await updateCart(userId, 1, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('1 is not a string')
  })

  it('should fail when product id is empty', async () => {
    let error

    try {
      await updateCart(userId, '', quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(VoidError)
    expect(error.message).to.equal('string is empty or blank')
  })

  it('should fail when user does not exist', async () => {
    let error
    userId = new ObjectId().toString()
    quantity = 0

    try {
      await updateCart(userId, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`user with id ${userId} does not exist`)
  })

  it('should fail when user id is not string', async () => {
    let error

    try {
      await updateCart(true, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('true is not a string')

    try {
      await updateCart(1, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('1 is not a string')
  })

  it('should fail when user id is empty', async () => {
    let error

    try {
      await updateCart('', productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(VoidError)
    expect(error.message).to.equal('string is empty or blank')
  })

  it('should fail on negative quantity', async () => {
    let error
    quantity = -1

    try {
      await updateCart(userId, productId, quantity)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(ValueError)
    expect(error.message).to.equal(`${quantity} is not a positive number`)
  })

  it('should fail when quantity is not numeric', async () => {
    let error

    try {
      await updateCart(userId, productId, true)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('true is not a number')

    try {
      await await updateCart(userId, productId, 'abc')
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('abc is not a number')

    try {
      await updateCart(userId, productId, NaN)
    } catch (err) {
      error = err
    }

    expect(error).to.be.instanceOf(TypeError)
    expect(error.message).to.equal('NaN is not a number')
  })

  afterEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()
  })

  after(() => mongoose.disconnect())
})
