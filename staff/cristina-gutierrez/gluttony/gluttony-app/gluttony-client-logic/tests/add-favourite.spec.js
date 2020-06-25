const addFavourite = require("../src/add-favourite")
const { random } = Math
require("gluttony-commons/polyfills/json")

describe("logic - add favourite", () => {
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

    it("should succeed on valid data", () => {
        addFavourite(storeId)
            .then(result => expect(result).toBeUndefined())
    })

    describe("when favourite already exists", () => {
        it("should fail on trying to add favourite", async done => {
            await addFavourite(storeId)
            
            addFavourite(storeId)
                .then(error => expect(error).toBeDefined())
                .then(done)
        })
    })
})