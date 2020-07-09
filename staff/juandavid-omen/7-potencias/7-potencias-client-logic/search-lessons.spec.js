/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process

const searchLessons = require('./search-lessons')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { Lesson } } = require('7-potencias-data')
require('7-potencias-commons/ponyfills/xhr')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('searchLessons', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let name, price, style, hour, minute, day, month, year

  beforeEach(async () => {
    await Lesson.deleteMany()

    name = `name-${random()}`
    price = random() * 1000
    style = `style-${random()}`
    hour = random() * 24
    minute = random() * 60
    day = random() * 7
    month = random() * 12
    year = random() * 2000

    return Lesson.create({ name, price, style, hour, minute, day, month, year })
  })

  it('should return all lessons', async () => {
    const lessons = await searchLessons()

    expect(lessons).to.be.an('array').lengthOf(1)

    const [lesson] = lessons

    expect(lesson.name).to.equal(name)
    expect(lesson.price).to.equal(price)
    expect(lesson.style).to.equal(style)
    expect(lesson.hour).to.equal(hour)
    expect(lesson.minute).to.equal(minute)
    expect(lesson.day).to.equal(day)
    expect(lesson.month).to.equal(month)
    expect(lesson.year).to.equal(year)
  })

  afterEach(() => Lesson.deleteMany())

  after(mongoose.disconnect)
})
