require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateUser = require("../src/authenticate-user")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

describe("logic - authenticate user", () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash

    beforeEach(() =>
        Users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe("when user already exists", () => {
        beforeEach(() =>
            Users.create({ name, surname, email, password: hash })
                .then(user => userId = user.id)
        )

        it("should succeed on correct credentials", () =>
            authenticateUser(email, password)
                .then(_userId => expect(_userId).toBe(userId))
        )

        it("should fail on wrong password", () => {
            password += "wrong-"

            return authenticateUser(email, password)
                .then(() => { throw new Error("should not reach this point") })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("wrong password")
                })
        })
    })

    it("should fail when user does not exist", () =>
        authenticateUser(email, password)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`user with e-mail ${email} does not exist`)
            })
    )

    afterEach(() => Users.deleteMany())

    after(mongoose.disconnect)
})