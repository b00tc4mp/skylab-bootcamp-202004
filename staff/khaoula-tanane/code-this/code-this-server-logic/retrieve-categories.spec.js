require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
const { mongoose, models: { Category } } = require('code-this-data')
const retrieveCategories = require('./retrieve-categories')

describe('logic - retrieve categories', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let name, challenges
    
    beforeEach(async () => {
        await Category.deleteMany()
        name = `nombre-${random()}`
        challenges = ["5ede5db914043b57fb3109f9", "5ede5db914043b57fb3109fa"]
        await Category.create({ name, challenges })
    })

    it('should succeed on retrieving categories', async () => {
        const categories = await retrieveCategories()

        expect(categories.length).to.equal(1)
        expect(categories).to.be.an('array')
  
    })

    afterEach(() => Category.deleteMany())

    after(mongoose.disconnect)
})