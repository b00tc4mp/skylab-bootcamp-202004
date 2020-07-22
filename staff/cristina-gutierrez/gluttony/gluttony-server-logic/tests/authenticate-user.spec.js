require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateUser = require("../src/authenticate-user")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

describe("logic - authenticate user", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, name, surname, email, password

    beforeEach(async () => {
        id = `id-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        await bcrypt.hash(password, 10)
            .then(hash => Users.create({ id, name, surname, email, password: hash }))
    });

    describe("when user already exists", () => {
        it("should succeed on correct credentials", async () => {
            await authenticateUser(email, password)
                .then(_id => expect(_id).toBe(id))
        })

        it("should fail on wrong password", async () => {
            password += "wrong"

            await authenticateUser(email, password)
                .then(() => { throw new Error("should not reach this point") })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe("Wrong password")
                })
        })
    });

    it("should fail when user does not exist", async () => {
        email = "e-wrong@mail.com"

        await authenticateUser(email, password)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`User with e-mail ${email} does not exist`)
            })
    });

    afterEach(() => Users.deleteMany());
    
    afterAll(mongoose.disconnect);
})