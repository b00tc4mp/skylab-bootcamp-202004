const { __context__, getFavourites } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - get favourite", () => {
    it("should return an empty array when user has no favourites", () => {
        getFavourites()
            .then(favourites => {
                expect(favourites).toHaveLength(0)
            })
    })

    it("should succeed when user has favourites", () => {
        getFavourites()
            .then(favourites => {
                expect(favourites).toHaveLength(1)
            })
    })
})