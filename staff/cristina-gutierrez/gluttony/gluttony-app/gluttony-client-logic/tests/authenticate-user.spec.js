const { random } = Math
const { __context__, authenticateUser } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - authenticate user", () => {
    let email, password

    beforeEach(() => {
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it("should succeed on correct credentials", async done => {
        const TOKEN = "token"

        __context__.httpClient.succeed({ token: TOKEN })

        await authenticateUser(email, password)
            .then(token => {
                expect(token).toBe(TOKEN)

                const persistedToken = __context__.storage.getItem("token")

                expect(persistedToken).toBe(TOKEN)
            })

        done()
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        
        await authenticateUser(email, password)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })

    describe("should fail on validation", () => {
        it("when is not a valid email", () => {
            const EMAIL = "email"

            authenticateUser(EMAIL, password)
                .then(() => { throw new Error("should not reach this point") })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe(`${EMAIL} is not an e-mail`)
                })
        })

        it("when is not a valid password", () => {
            authenticateUser(email, "")
                .then(() => { throw new Error("should not reach this point") })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe(`string is empty or blank`)
                })
        })
    })
})