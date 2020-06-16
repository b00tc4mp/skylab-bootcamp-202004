require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerUser = require("../src/register-user")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

describe("logic - register user", () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password

    beforeEach(async () => {
        await Users.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it("should succeed on valid data", async () => {
        const result = await registerUser(name, surname, email, password)

        expect(result).toBeUndefined()

        const users = await Users.find()

        expect(users.length).toBe(1)

        const [user] = users

        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)

        const match = await bcrypt.compare(password, user.password)

        expect(match).toBe(true)
    })

    describe("when user already exists", () => {
        beforeEach(() => Users.create({ name, surname, email, password }))

        it("should fail on trying to register an existing user", async () => {
            try {
                await registerUser(name, surname, email, password)

                throw new Error("should not reach this point")
            } catch (error) {
                expect(error).to.exist

                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`user with e-mail ${email} already exists`)
            }
        })
    })

    afterEach(() => Users.deleteMany())

    after(mongoose.disconnect)
})