const { random } = Math
require("gluttony-commons/polyfills/json")
const addFavourite = require('../src/add-favourite')
const getFavourites = require('../src/get-favourites')

describe("logic - get favourite", () => {
    let name, surname, email, password, storeId

    beforeEach(async done => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        storeId = `id-${random()}`

        await registerUser(name, surname, email, password)
        await authenticateUser(email, password)

        done()
    })

    it("should return empty array when user has no favourites", async done => {
        const favourites = await getFavourites(userId)

        expect(favourites).toHaveLength(0)

        done()
    })

    it("should succeed when user has favourites", async done => {
        await addFavourite(storeId)

        const favourites = await getFavourites()

        expect(favourites).toHaveLength(1)

        done()
    })
})