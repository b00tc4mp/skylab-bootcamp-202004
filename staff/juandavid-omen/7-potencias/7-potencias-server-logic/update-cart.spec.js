/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-cart')
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { mongoose, models: { User, Lesson } } = require('7-potencias-data')
const { errors: { UnexistenceError } } = require('7-potencias-commons')

describe('logic - update cart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let userId, productSelectionId, quantity

  beforeEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()

    const user = {
      name: `name-${random()}`,
      surname: `surname-${random()}`,
      email: `e-${random()}@mail.com`,
      password: `password-${random()}`,
      cart: [`cart-${random()}`],
      orders: [`orders-${random()}`]
    }

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

    quantity = randomIntegerBetween(1, 100)

    userId = await User.create(user)
    lessonId = await Lesson.create(lesson)
  })

  it('should succeed on existing user and lesson', async () => {
    const result = await updateCart(userId, productSelectionId, quantity)
    expect(result).to.be.undefined

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart } = user

    expect(cart).to.exist
    expect(cart).to.have.lengthOf(1)

    const [_lesson] = cart

    expect(_lesson).to.exist

    const { lesson, quantity: _quantity } = _lesson

    expect (lesson.toString()).to.equal(productSelectionId)
    expect(_quantity).to.equal(quantity)
  })

  it('should fail on trying to remove a whole lesson that is not already in cart', async () => {
    let error
    try {
      await updateCart(userId, productSelectionId, quantity = 0)
    } catch (err) {
      error = err
    }
    expect(error).to.exist

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`lesson with id ${productSelectionId} does not exist in cart for user with id ${userId}`)
  })

  it('should fail on negative quantity', async () => {
    quantity = -1

    expect(async () => {
      await updateCart(userId, productSelectionId, quantity)
    }).to.throw(TypeError, `${quantity} is not a positive number`)
  })

  it('should fail on non-string user id', () => {
    expect(async () => {
      await updateCart(true, productSelectionId, quantity)
    }).to.throw(TypeError, 'true is not a string')

    expect(async () => {
      await updateCart(1, productSelectionId, quantity)
    }).to.throw(TypeError, '1 is not a string')
  })

  it('should fail on non-string lesson id', () => {
    expect(async () => {
      await updateCart(userId, true, quantity)
    }).to.throw(TypeError, 'true is not a string')

    expect(async () => {
      await updateCart(userId, 1, quantity)
    }).to.throw(TypeError, '1 is not a string')
  })

  it('should fail on non-numeric quantity', () => {
    expect(async () => {
      await updateCart(userId, productSelectionId, true)
    }).to.throw(TypeError, 'true is not a number')

    expect(async () => {
      await updateCart(userId, productSelectionId, 'abc')
    }).to.throw(TypeError, 'abc is not a number')

    expect(async () => {
      await updateCart(userId, productSelectionId, NaN)
    }).to.throw(TypeError, 'NaN is not a number')
  })

  it('should fail when user does not exist', () =>
    updateCart(userId = ObjectId().toString(), productSelectionId, 1)
      .then(() => { throw new Error('it should not reach this point') })
      .catch(error => {
        expect(error).to.exist

        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`user with id ${userId} does not exist`)
      })
  )

  it('should fail when lesson does not exist', () =>
    updateCart(userId, productSelectionId = ObjectId().toString(), 1)
      .then(() => { throw new Error('it should not reach this point') })
      .catch(error => {
        expect(error).to.exist

        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`lesson with id ${productSelectionId} does not exist`)
      })
  )

  afterEach(async () => {
    await User.deleteMany()
    await Lesson.deleteMany()
  })

  after(() => mongoose.disconnect())
})
