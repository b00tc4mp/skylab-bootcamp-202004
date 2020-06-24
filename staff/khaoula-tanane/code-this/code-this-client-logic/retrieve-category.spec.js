require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
require('code-this-commons/ponyfills/xhr')
const { mongo } = require('../code-this-data')
const retrieveCategory = require('./retrieve-category')

describe('logic - retrieve category', () => {
    let categories

    before(() => mongo.connect(MONGODB_URL).then(connection => categories = connection.db().collection('users')))

    let name

    beforeEach(() =>
        categories.deleteMany()
            .then(() => {
                name = `name-${random()}`
            })
    )

    describe('when category already exists', () => {
        beforeEach(() => {
            const category = { name }

            return categories.insertOne(category)
                .then(result => categoryId = result.insertedId.toString())
                .catch((error) => console.log(error))
            })

        it('should succeed on correct category id', () =>
            retrieveCategory(name)
                .then(category => {
                    expect(category.name).to.equal(name)
                })
        )
    })

    // it('should fail when user does not exist', () => {
    //     const userId = '5ed1204ee99ccf6fae798aef'

    //     return retrieveUser(userId)
    //         .then(() => { throw new Error('should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.an.instanceof(Error)
    //             expect(error.message).to.equal(`user with id ${userId} does not exist`)
    //         })
    // })

    afterEach(() => categories.deleteMany())

    after(() => categories.deleteMany().then(mongo.disconnect))
})