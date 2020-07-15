require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('misc-commons/polyfills/json')
const { mongo } = require('misc-data')
const bcrypt = require('bcryptjs')
require('misc-commons/ponyfills/xhr')

describe('logic - retrieve-user', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => users = connection.db().collection('users'))
    )

    let name, surname, email, password

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exists', () => {
        let token
        beforeEach(() => {
            const user = { name, surname, email, password: hash }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on valid data', () =>
            retrieveUser(token)
                .then((users) => users.find({ token })
                    .then(user => {
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.email).to.equal(email)
                        expect(user.password).to.not.exist          
                    })
                ))

        afterEach(() => users.deleteMany())

        after(() => users.deleteMany({}).then(mongo.disconnect))
    })

})