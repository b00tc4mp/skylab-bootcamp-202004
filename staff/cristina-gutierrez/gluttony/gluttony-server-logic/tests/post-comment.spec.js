require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const postComment = require("../src/post-comment")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Comments } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

describe("logic - post comment", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let id, text, creationDate, userId, storeId

    beforeEach(done => {
        id = `id-${random()}`
        text = `text-${random()}`
        creationDate = Date.now()
        userId = `id-${random()}`
        storeId = `id-${random()}`

        Comments.deleteMany()
            .then(() => done())
    })

    it("should succeed on valid data", done => {
        Comments.find()
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

                done()
            })
    })

    afterEach(() => Comments.deleteMany())

    afterAll(mongoose.disconnect)
})