/* eslint-env mocha */

require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const searchLessons = require('./search-lessons')
const { random } = Math
const { expect } = require('chai')
require('7-potencias-commons/polyfills/json')
const { mongoose, models: { Lesson } } = require('7-potencias-data')

describe('logic - retrieve user', () => {
  before(() => mongoose.connect(MONGODB_URL))

  let nameLesson1, nameLesson2

  beforeEach(async () => {
    await Lesson.deleteMany()
  })

  describe('when user already exists', () => {
    beforeEach(async () => {

      nameLesson1 = 'name1'
      const lesson = {
        name: nameLesson1,
        price: random() * 1000,
        style: `style-${random()}`,
        hour: random() * 24,
        minute: random() * 60,
        day: random() * 7,
        month: random() * 12,
        year: random() * 2000
      }

      nameLesson2 = 'name2'
      const lesson2 = {
        name: nameLesson2,
        price: random() * 1000,
        style: `style-${random()}`,
        hour: random() * 24,
        minute: random() * 60,
        day: random() * 7,
        month: random() * 12,
        year: random() * 2000
      }

      await Lesson.create(lesson)
      await Lesson.create(lesson2)
    })

    it('should return all lessons when no query specified', async () => {
      const lessons = await searchLessons()
      expect(lessons).to.be.an('array').of.length(2)

      const [lesson1, lesson2] = lessons
      expect(lesson1.name).to.equal(nameLesson1)
      expect(lesson2.name).to.be.equal(nameLesson2)
    })

    it('should return lessons that satisfies the criteria', async () => {
      const lessons = await searchLessons(nameLesson1)
      expect(lessons).to.be.an('array').of.length(1)

      const [lesson1] = lessons
      expect(lesson1.name).to.equal(nameLesson1)
    })

    afterEach(() => Lesson.deleteMany())

    after(async () => {
      await Lesson.deleteMany()
      mongoose.disconnect
    })
  })
})
