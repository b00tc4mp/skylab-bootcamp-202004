require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('../src/retrieve-user')
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")

describe("logic - retrieve user", () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId

    beforeEach(() =>
        Users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe("when user already exists", () => {
        beforeEach(() =>
            Users.create({ name, surname, email, password })
                .then(user => userId = user.id)
        )

        it("should succeed on correct user id", () =>
            retrieveUser(userId)
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                    expect(user.password).toBeUndefined()
                    expect(user.cart).toBeUndefined()
                    expect(user.order).toBeUndefined()
                })
        )
    })

    it("should fail when user does not exist", () => {
        const userId = '5ed1204ee99ccf6fae798aef'

        return retrieveUser(userId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBe()

                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`user with id ${userId} does not exist`)
            })
    })

    afterEach(() => Users.deleteMany())

    after(mongoose.disconnect)
})