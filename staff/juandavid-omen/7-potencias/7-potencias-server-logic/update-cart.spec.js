require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-cart')
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { mongoose, models: { User, Product } } = require('7-potencias-data')
const { errors: { UnexistenceError, ValueError } } = require('7-potencias-commons')

describe('logic - update cart', () => {
  let users, products

  before(() => mongoose.connect(MONGODB_URL))

  let userId, productId, quantity

  beforeEach(async () => {
    await User.deleteMany()
    await Product.deleteMany()

    const user = {
      name: `name-${random()}`,
      surname: `surname-${random()}`,
      email: `e-${random()}@mail.com`,
      password: `password-${random()}`
    }

    const product = {
      name: `name-${random()}`,
      description: `description-${random()}`,
      price: random() * 1000,
      url: `url-${random()}`
    }

    quantity = randomIntegerBetween(1, 100)

    userId = await User.create(user)
    productId = await Product.create(product)

  })

  it('should succeed on existing user and product', async () => {
    const result = await updateCart(userId, productId, quantity)
    expect(result).to.be.undefined

    const user = await User.findById(userId)
    expect(user).to.exist

    const { cart } = user

    expect(cart).to.exist
    expect(cart).to.have.lengthOf(1)

    const [_product] = cart

    expect(_product).to.exist

    const { product, quantity: _quantity } = _product

    expect(product.toString()).to.equal(productId)
    expect(_quantity).to.equal(quantity)
  })

  it('should fail on trying to remove a whole product that is not already in cart', async () => {
    let error
    try {
      await updateCart(userId, productId, quantity = 0)
    } catch (err) {
      error = err
    }
    expect(error).to.exist

    expect(error).to.be.instanceOf(UnexistenceError)
    expect(error.message).to.equal(`product with id ${productId} does not exist in cart for user with id ${userId}`)
  })

  it('should fail on negative quantity', async () => {
    quantity = -1

    expect(async () => {
      await updateCart(userId, productId, quantity)
    }).to.throw(TypeError, `${quantity} is not a positive number`)
  })

  it('should fail on non-string user id', () => {

    expect(async () => {
      await updateCart(true, productId, quantity)
    }).to.throw(TypeError, 'true is not a string')

    expect(async () => {
      await updateCart(1, productId, quantity)
    }).to.throw(TypeError, '1 is not a string')
  })

  it('should fail on non-string product id', () => {

    expect(async () => {
      await updateCart(userId, true, quantity)
    }).to.throw(TypeError, 'true is not a string')

    expect(async () => {
      await updateCart(userId, 1, quantity)
    }).to.throw(TypeError, '1 is not a string')

  })

  it('should fail on non-numeric quantity', () => {
    expect(async () => {
      await updateCart(userId, productId, true)
    }).to.throw(TypeError, 'true is not a number')

    expect(async () => {
      await updateCart(userId, productId, 'abc')
    }).to.throw(TypeError, 'abc is not a number')

    expect(async () => {
      await updateCart(userId, productId, NaN)
    }).to.throw(TypeError, 'NaN is not a number')

  })

  it('should fail when user does not exist', () =>
    updateCart(userId = ObjectId().toString(), productId, 1)
      .then(() => { throw new Error('it should not reach this point') })
      .catch(error => {
        expect(error).to.exist

        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`user with id ${userId} does not exist`)
      })
  )

  it('should fail when product does not exist', () =>
    updateCart(userId, productId = ObjectId().toString(), 1)
      .then(() => { throw new Error('it should not reach this point') })
      .catch(error => {
        expect(error).to.exist

        expect(error).to.be.instanceOf(UnexistenceError)
        expect(error.message).to.equal(`product with id ${productId} does not exist`)
      })
  )

  afterEach(async () => {
   await User.deleteMany()
   await Product.deleteMany()
  })

  after(() => mongoose.disconnect())
})
