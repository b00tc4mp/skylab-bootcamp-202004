const { __context__, retrieveUser } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - retrieve user", () => {
    it("should fail on trying to add favourite without token", () => {
        retrieveUser()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Error retrieving data")
            })
    })

    it("should succeed on valid data", async done => {
        const USER = 'user'

        __context__.httpClient.succeed(USER)
        __context__.storage.setItem("token", "token")

        await retrieveUser()
            .then(user => expect(user).toBe(USER))
        
        done()
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        __context__.storage.setItem("token", "token")

        await retrieveUser()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })
})