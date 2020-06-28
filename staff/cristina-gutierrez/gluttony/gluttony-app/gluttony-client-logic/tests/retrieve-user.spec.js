const { random } = Math
const { __context__, retrieveUser } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - retrieve user", () => {
    it("when user already exists should succeed on correct user id", () => {
        retrieveUser()
            .then(user => {
                expect(user.id).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
            })
    })
})