const { random } = Math
const { __context__, registerUser } = require("../src/")

__context__.httpClient = require("./mocks/fake-client")
__context__.storage = require("./mocks/fake-storage")

describe("logic - register user", () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it("should succeed on valid data", () => {
        registerUser(name, surname, email, password)
            .then(result => expect(result).toBeUndefined())
    })

    describe("when user already exists", () => {
        it("should fail on trying to register an existing user", () => {
            registerUser(name, surname, email, password)
                .catch(error => expect(error).toBeDefined())
        })
    })
})