/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const updateCart = require('./update-cart')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { User, Lesson, ProductSelection } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('7-potencias-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('update cart', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, surname, email, password, lessonName, price, style, hour, minute, day, month, year, productId, quantity

  beforeEach(() =>
    Lesson.deleteMany()
      .then(() => User.deleteMany())
      .then(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        lessonName = `name-${random()}`
        price = random() * 1000
        style = `style-${random()}`
        hour = random() * 24
        minute = random() * 60
        day = random() * 7
        month = random() * 12
        year = random() * 2000
      })
  )

  describe('when user already exists', () => {
    beforeEach(() =>
      Lesson.create({ lessonName, price, style, hour, minute, day, month, year })
        .then((lesson) => {
          productId = lesson._id
          const productSelection = new ProductSelection({ product: lesson, quantity: 1 })

          return User.create({ name, surname, email, password, cart: [productSelection] })
        })
        .then(user => jwtPromised.sign({ sub: user.id }, SECRET))
        .then(token => context.storage.token = token))
  })

  it('should succeed on correct user id', () =>
  
    updateCart(productId, quantity = 2)
      .then(cart => {
        expect(cart._).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.be.undefined
      })
  )

  describe('when user does not exist', () => {
    let userId

    beforeEach(() => {
      userId = '5ed1204ee99ccf6fae798aef'

      return jwtPromised.sign({ sub: userId }, SECRET)
        .then(token => context.storage.token = token)
    })

    it('should fail when user does not exist', () =>
      updateCart(productId, quantity)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
          expect(error).to.exist
          expect(error).to.be.an.instanceof(Error)
          expect(error.message).to.equal(`user with id ${userId} does not exist`)
        })
    )
  })

  afterEach(() => User.deleteMany()
    .then(() => Lesson.deleteMany))

  after(mongoose.disconnect)
})
