require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
const { mongoose, models: { Category } } = require('code-this-data')
const category = require('code-this-data/models/category')
const retrieveCategory = require('./retrieve-category')

describe('logic - retrieve category', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name
    
    beforeEach(async () => {
        await Category.deleteMany()
        name = `nombre-${random()}`
        await Category.create({ name })
    })

    describe('when category already exists', () => {

        it('should succeed on correct user data', () =>
        retrieveCategory(name)
                .then(category => {
                    expect(category.name).to.equal(name)
                })
        )
    })

    it('should fail when category does not exist', () => {
        const _name = `name-${random()}`

        return retrieveCategory(_name)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`category with name ${_name} does not exist`)
            })
    })

    afterEach(() => Category.deleteMany())

    after(mongoose.disconnect)
})