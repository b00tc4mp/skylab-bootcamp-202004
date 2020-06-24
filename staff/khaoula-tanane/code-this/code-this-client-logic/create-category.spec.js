require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const createCategory = require('./create-category')
const { expect } = require('chai')
const { random } = Math
require('code-this-commons/polyfills/json')
const { mongo } = require('../code-this-data')
const { models: { Challenge } } = require('code-this-data')
const { init } = require('code-this-data/models/user')

context.API_URL = API_URL

describe.only('logic - create category', () => {
    before(() =>
    mongo.connect(MONGODB_URL)
        .then(connection => categories = connection.db().collection('categories'))
)

    let name, challenges
    
    beforeEach(() =>
    categories.deleteMany()
    .then(() => {
            name = `name-${random()}`
            challenges = ["5ede5db914043b57fb3109f9", "5ede5db914043b57fb3109fa"]
            })
    )

    it('should succeed on valid data', () => {
        createCategory({name, challenges})
            .then(() => categories.find().toArray())
            .then(_categories => {
                expect(_categories.length).to.equal(1)

                const [category] = _categories

                expect(category.name).to.equal(name)
                expect(category.challenges).to.equal(challenges)
    

            })

    })

    describe('when category already exists', () => {
        beforeEach(() => categories.insertOne({ name, challenges }))
        it('should fail on trying to create an existing category', async () => {
            createCategory({name, challenges})
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
            })
        })
    })

    afterEach(() => categories.deleteMany())

    after(mongo.disconnect)
})