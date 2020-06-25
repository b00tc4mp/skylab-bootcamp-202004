require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users, Stores } } = require("gluttony-data")
const removeFavourite = require("../src/remove-favourite")
const addFavourite = require("../src/add-favourite")

describe("logic - add favourite", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let userId, storeId

    beforeEach(done => {
        userId = `id-${random()}`
        storeId = `id-${random()}`

        Users.create({ 
                id: userId, 
                name: "name", 
                surname: "surname", 
                email: `e-${random()}@mail.com`,
                password: "password" 
            })
            .then(() => Stores.create({ 
                id: storeId, 
                name: "name", 
                type: "bar", 
                location: "location", 
                coordinates: { 
                    latitude: random(), 
                    longitude: random() 
                } 
            }))
            .then(() => addFavourite(storeId, userId))
            .then(() => done())
    })

    it("should succeed", done => {
        removeFavourite(storeId, userId)
            .then(result => {
                expect(result).toBeUndefined()

                return Users.findById(userId, "favouriteStores").lean()
            })
            .then(user => user.favouriteStores)
            .then(favourites => {
                expect(favourites).toHaveLength(0)
                done()
            })
    })

    afterEach(() => {
        Users.deleteMany()
        Stores.deleteMany()
    })

    afterAll(mongoose.disconnect)
})