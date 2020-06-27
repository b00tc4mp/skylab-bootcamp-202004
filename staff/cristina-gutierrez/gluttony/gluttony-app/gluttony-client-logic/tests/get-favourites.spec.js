const { random } = Math
require("gluttony-commons/polyfills/json")
const addFavourite = require('../src/add-favourite')
const getFavourites = require('../src/get-favourites')

describe("logic - get favourite", () => {
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

    it("should return an empty array when user has no favourites", async () => {
        const favourites = await getFavourites(userId)

        expect(favourites).toHaveLength(0)
    })

    it("should succeed when user has favourites", async () => {
        await addFavourite(storeId)

        const favourites = await getFavourites()

        expect(favourites).toHaveLength(1)
    })
})