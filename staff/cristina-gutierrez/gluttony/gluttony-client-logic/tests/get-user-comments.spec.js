const { __context__, getUserComments } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - get user comments", () => {
    it("should fail on trying to add favourite without token", () => {
        getUserComments()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Error retrieving data")
            })
    })

    it("should succeed on valid data", async done => {
        const COMMENTS = 'comment'

        __context__.httpClient.succeed({ comments: COMMENTS })
        __context__.storage.setItem("token", "token")

        await getUserComments()
            .then(comments => expect(comments).toBe(COMMENTS))
        
        done()
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        __context__.storage.setItem("token", "token")

        await getUserComments()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })
})