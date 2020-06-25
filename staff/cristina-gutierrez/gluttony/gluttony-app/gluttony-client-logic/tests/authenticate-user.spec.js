const authenticateUser = require("../src/authenticate-user")
const { random } = Math
require("gluttony-commons/polyfills/json")

describe("logic - authenticate user", () => {
    let name, surname, email, password

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        await registerUser(name, surname, email, password)
    })

    describe("when user already exists", () => {
        it("should succeed on correct credentials", () => {
            authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        })

        it("should fail on wrong password", () => {
            password += "wrong"

            authenticateUser(email, password)
                .then(() => { throw new Error("should not reach this point") })
                .catch(error => expect(error).toBeDefined())
        })
    })

    it("should fail when user does not exist", () => {
        email = "e-wrong@mail.com"

        authenticateUser(email, password)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`user with e-mail ${email} does not exist`)
            })
    })
})