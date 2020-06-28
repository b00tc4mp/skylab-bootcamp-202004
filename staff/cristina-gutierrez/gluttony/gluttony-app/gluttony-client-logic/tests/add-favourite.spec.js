const { random } = Math
const { __context__, addFavourite } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - add favourite", () => {
    let storeId

    beforeEach(() => {
        storeId = `id-${random()}`
    })

    it("should fail on trying to add favourite without token", () => {
        addFavourite(storeId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Error retrieving data")
            })
    })

    it("should succeed on valid data", async done => {
        __context__.storage.setItem("token", storeId)

        await addFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
        
        done()
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        __context__.storage.setItem("token", storeId)

        await addFavourite(storeId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })
})