require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveUser = require('../src/retrieve-user')
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")

describe("logic - retrieve user", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, name, surname, email, password

    beforeEach(async () => {
        id = `id-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        await Users.create({ id, name, surname, email, password })
    });

    it("when user already exists should succeed on correct user id", async () => {
        const user = await retrieveUser(id)

        expect(user.id).toBe(id)
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined()
    });

    it("should fail when user does not exist", async () => {
        const userId = '5ed1204ee99ccf6fae798aef'

        await retrieveUser(userId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()

                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`user with id ${userId} does not exist`)
            })
    });

    afterEach(() => Users.deleteMany());

    afterAll(mongoose.disconnect);
})