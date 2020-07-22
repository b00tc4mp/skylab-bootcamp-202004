require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const postComment = require("../src/post-comment")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Comments } } = require("gluttony-data")

describe("logic - post comment", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, text, creationDate, userId, storeId

    beforeEach(async () => {
        id = `id-${random()}`
        text = `text-${random()}`
        creationDate = Date.now()
        userId = `id-${random()}`
        storeId = `id-${random()}`

        await Comments.deleteMany()
    });

    it("should succeed on valid data", async () => {
        await Comments.find()
            .then(comments => {
                expect(comments).toHaveLength(0)
                
                return postComment(id, text, creationDate, userId, storeId)
            })
            .then(result => {
                expect(result).toBeUndefined()

                return Comments.find()
            })
            .then(comments => {
                expect(comments).toHaveLength(1)

                return Comments.findById(id)
            })
            .then(comment => {
                expect(comment.id).toBe(id)
                expect(comment.text).toBe(text)
                expect(comment.creationDate.getTime()).toEqual(creationDate)
                expect(comment.user).toBe(userId)
                expect(comment.store).toBe(storeId)
            })
    });

    it("should succeed on valid data without id", async () => {
        await Comments.find()
            .then(comments => {
                expect(comments).toHaveLength(0)
                
                return postComment(undefined, text, creationDate, userId, storeId)
            })
            .then(result => {
                expect(result).toBeUndefined()

                return Comments.find()
            })
            .then(comments => {
                expect(comments).toHaveLength(1)

                return Comments.findOne({ creationDate })
            })
            .then(comment => {
                expect(comment.id).toBeDefined()
                expect(comment.text).toBe(text)
                expect(comment.creationDate.getTime()).toEqual(creationDate)
                expect(comment.user).toBe(userId)
                expect(comment.store).toBe(storeId)
            })
    });

    afterEach(() => Comments.deleteMany());

    afterAll(mongoose.disconnect);
})