/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, removeFavourite } = require("../src/")
const { random } = Math
const {
	mongoose,
	models: { Users },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
	TEST_API_URL: API_URL,
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")






const { random } = Math

describe("logic - remove favourite", () => {
    let storeId

    beforeEach(async () => {
        storeId = `id-${random()}`
    })
    
    it("should fail on trying to add favourite without token", () => {
        removeFavourite(storeId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Error retrieving data")
            })
    })

    it("should succeed on valid data", () => {
        __context__.storage.setItem("token", storeId)

        removeFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        __context__.storage.setItem("token", storeId)

        await removeFavourite(storeId)
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })
})