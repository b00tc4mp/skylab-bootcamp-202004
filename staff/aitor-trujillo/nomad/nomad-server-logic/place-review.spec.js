require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const placeReview = require('./place-review')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace, User } } = require('nomad-data')

describe('logic - place review in workspace', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandom = {}
    let userName, surname, email, password, userId
    let workspaceId
    let stars, text

    beforeEach(async () => {

        await Workspace.deleteMany()
        await User.deleteMany()
            .then(() => {
                userName = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })


        await User.create({ name: userName, surname, email, password })
            .then(({ id }) => {
                userId = id
            })

        workspaceRandom = {
            creator: userId,
            name: `name-${random()}`,
            category: 'cowork',
            price: { amount: random() + 100, term: 'month' },
            address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
            geoLocation: { coordinates: [random(), random()] },
            // timetable = `timetable-${random()}`
            // photos: [`photo-${random()}`],
            phone: `phone-${random()}`,
            features: { wifi: true, parking: false, coffee: true, meetingRooms: false },
            description: `description-${random()}`,
            capacity: random(),
        }
        stars = Math.floor(random() * 5)
        text = `this is what i think: ${random()}`

        await Workspace.create(workspaceRandom)
            .then(({ id }) => { workspaceId = id })
    })

    it('should succeed on valid workspaceId', async () => {
        const result = await placeReview(userId, workspaceId, stars, text)

        expect(result).to.be.undefined

        const workspace = await Workspace.findOne({ _id: workspaceId })
        const { reviews } = workspace
        const [review] = reviews

        expect(review.user.toString()).to.equal(userId)
        expect(review.stars.toFixed(1)).to.equal(stars.toFixed(1))
        expect(review.text).to.equal(text)
    })

    afterEach(() => User.deleteMany().then(() => Workspace.deleteMany()))

    after(mongoose.disconnect)
})