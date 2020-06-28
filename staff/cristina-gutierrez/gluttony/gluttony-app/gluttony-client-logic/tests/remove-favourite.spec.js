const { random } = Math
const { __context__, removeFavourite } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - remove favourite", () => {
    let storeId

    beforeEach(async () => {
        storeId = `id-${random()}`
    })

    it("should succeed", () => {
        removeFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
    })
})