require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerUser = require("../src/register-user")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

describe("logic - register user", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, name, surname, email, password

    beforeEach(async () => {
        id = `id-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        await Users.deleteMany()
    })

    it("should succeed on valid data", async () => {
        await Users.find()
            .then(users => {
                expect(users).toHaveLength(0)
                
                return registerUser(id, name, surname, email, password)
            })
            .then(result => {
                expect(result).toBeUndefined()

                return Users.find()
            })
            .then(users => {
                expect(users).toHaveLength(1)

                return Users.findById(id)
            })
            .then(async user => {
                expect(user.id).toBe(id)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)

                const match = await bcrypt.compare(password, user.password)
                expect(match).toBe(true)
            })
    });

    it("should succeed on valid data without id",  async () => {
        await Users.find()
            .then(users => {
                expect(users).toHaveLength(0)
                
                return registerUser(undefined, name, surname, email, password)
            })
            .then(result => {
                expect(result).toBeUndefined()

                return Users.find()
            })
            .then(users => {
                expect(users).toHaveLength(1)

                return Users.findOne({ email })
            })
            .then(async user => {
                expect(user.id).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)

                const match = await bcrypt.compare(password, user.password)
                expect(match).toBe(true)
            })
    });

    it("should fail on trying to register an existing user", async () => {
        try {
            await Users.create({ id, name, surname, email, password })

            await registerUser(id, name, surname, email, password)
            
            throw new Error("should not reach this point")
        } catch (error) {
            expect(error).toBeDefined()

            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe(`User with e-mail ${email} already exists`)
        }
    });

    afterEach(() => Users.deleteMany());

    afterAll(mongoose.disconnect);
})