const { random } = Math
const { __context__, addFavourite } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - add favourite", () => {
    let storeId

    beforeEach(() => {
        storeId = `id-${random()}`
    })

    it("should succeed on valid data", () => {
        addFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
    })

    describe("when favourite already exists", () => {
        it("should fail on trying to add favourite", () => {
            addFavourite(storeId)
                .then(error => expect(error).toBeDefined())
        })
    })
})