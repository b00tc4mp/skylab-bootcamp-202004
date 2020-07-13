const { __context__, getFavourites } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - get favourite", () => {
    it("should fail on trying to add favourite without token", () => {
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