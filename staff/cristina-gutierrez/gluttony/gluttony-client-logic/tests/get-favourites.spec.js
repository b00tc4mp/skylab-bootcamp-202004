/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, getFavourites } = require("../src/")
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







describe("logic - get favourite", () => {
    it("should fail on trying to get favourites without token", () => {
        getFavourites()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("Error retrieving data")
            })
    })

    it("should succeed on valid data", async done => {
        const FAVOURITES = 'favourite'

        __context__.httpClient.succeed({ favouriteStores: FAVOURITES })
        __context__.storage.setItem("token", "token")

        await getFavourites()
            .then(favourites => expect(favourites).toBe(FAVOURITES))
        
        done()
    })

    it("should fail", async done => {
        const ERROR = "error"

        __context__.httpClient.fail(ERROR)
        __context__.storage.setItem("token", "token")

        await getFavourites()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(ERROR)
            })
        
        done()
    })
})