const { random } = Math
require("gluttony-commons/polyfills/json")
const removeFavourite = require("../src/remove-favourite")

describe("logic - remove favourite", () => {
    let name, surname, email, password, storeId

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        storeId = `id-${random()}`

        await registerUser(name, surname, email, password)
        await authenticateUser(email, password)
    })

    it("should succeed", () => {
        removeFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
    })
})