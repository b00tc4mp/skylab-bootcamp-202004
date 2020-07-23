require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Stores, Comments } } = require("gluttony-data")
const postComment = require("../src/post-comment")
const getUserComments = require("../src/get-user-comments")

describe("logic - get user comments", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, text, creationDate, userId, storeId

    beforeEach(async () => {
        id = `id-${random()}`
        text = `text-${random()}`
        creationDate = Date.now()
        userId = `id-${random()}`
        storeId = `id-${random()}`

        await Stores.create({ 
                id: storeId, 
                name: "name", 
                type: "bar", 
                location: "location", 
                coordinates: { 
                    latitude: random(), 
                    longitude: random() 
                } 
            })
    });

    it("should succeed when user has favourites", async () => {
        await postComment(id, text, creationDate, userId, storeId)

        const comments = await getUserComments(userId)

        expect(comments).toHaveLength(1)

        const comment = comments[0]

        expect(comment.id).toBe(id)
        expect(comment.text).toBe(text)
        expect(comment.creationDate.getTime()).toEqual(creationDate)
        expect(comment.user).toBe(userId)
        expect(comment.store.id).toBe(storeId)
    });

    it("should return empty array when user has no favourites", async () => {
        const comments = await getUserComments(userId)

        expect(comments).toHaveLength(0)
    });

    afterEach(() => {
        Stores.deleteMany()
        Comments.deleteMany()
    });

    afterAll(mongoose.disconnect);
})