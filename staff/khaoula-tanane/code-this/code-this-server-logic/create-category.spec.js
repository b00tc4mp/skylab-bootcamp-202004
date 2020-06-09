require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const createCategory = require('./create-category')
const { expect } = require('chai')
const { random } = Math
require('code-this-commons/polyfills/json')
const { mongoose, models: { Category } } = require('code-this-data')

describe('logic - create category', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let name, challenges

    beforeEach(async () => {
        await Category.deleteMany()
        name = `name-${random()}`
        challenges = ["5ede5db914043b57fb3109f9", "5ede5db914043b57fb3109fa"]
    })

    it('should succeed on valid data', async () => {
        const result = await createCategory(name, challenges)

        expect(result).to.be.undefined

        const categorys = await Category.find()

        expect(categorys.length).to.equal(1)

        const [category] = categorys

        expect(category.name).to.equal(name)
        expect(category.challenges.length).to.equal(2)

    })

    describe('when category already exists', () => {
        beforeEach(() => Category.create({name, challenges}))

        it('should fail on trying to create an existing category', async () => {
            try {
                await createCategory(name, challenges)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
            }
        })
    })

    afterEach(() => Category.deleteMany())

    after(mongoose.disconnect)
})