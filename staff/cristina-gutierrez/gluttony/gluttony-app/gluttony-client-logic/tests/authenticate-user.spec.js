const { random } = Math
const { __context__, authenticateUser } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - authenticate user", () => {
    let email, password

    beforeEach(async () => {
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
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