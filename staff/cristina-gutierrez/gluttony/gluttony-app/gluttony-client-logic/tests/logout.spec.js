const { random } = Math
const { __context__, logout } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - logout", () => {
    it("should succeed", () => {
        __context__.storage.setItem("token", "token")
        
        logout().then(result => {
            expect(result).toBeUndefined()

            const stored = __context__.storage._items

            expect(stored).toHaveLenght(0)
        })
    })
})